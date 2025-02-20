import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarefa, Prioridade } from '../models/todo.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tarefas: BehaviorSubject<Tarefa[]> = new BehaviorSubject<Tarefa[]>([]);
  private readonly CHAVE_STORAGE = 'tarefas';
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.carregarTarefas();
  }

  private carregarTarefas(): void {
    if (this.isBrowser) {
      try {
        if (typeof localStorage !== 'undefined') {
          const tarefasArmazenadas = localStorage.getItem(this.CHAVE_STORAGE);
          if (tarefasArmazenadas) {
            const tarefas = JSON.parse(tarefasArmazenadas);
            this.tarefas.next(tarefas);
          }
        }         
      } catch (erro) {
        console.error('Erro ao carregar tarefas:', erro);
        this.tarefas.next([]);
      }
    }
  }

  private salvarTarefas(): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.CHAVE_STORAGE, JSON.stringify(this.tarefas.value));
      } catch (erro) {
        console.error('Erro ao salvar tarefas:', erro);
      }
    }
  }

  obterTarefas(): Observable<Tarefa[]> {
    const usuarioAtual = this.authService.obterUsuarioAtual();
    if (!usuarioAtual) return new BehaviorSubject<Tarefa[]>([]).asObservable();
    
    const tarefasDoUsuario = this.tarefas.value.filter(
      tarefa => tarefa.usuarioId === usuarioAtual
    );
    return new BehaviorSubject<Tarefa[]>(tarefasDoUsuario).asObservable();
  }

  obterTarefasPorPrioridade(prioridade: Prioridade): Tarefa[] {
    const usuarioAtual = this.authService.obterUsuarioAtual();
    if (!usuarioAtual) return [];
    
    return this.tarefas.value.filter(
      tarefa => tarefa.usuarioId === usuarioAtual && tarefa.prioridade === prioridade
    );
  }

  adicionarTarefa(titulo: string, descricao: string, prioridade: Prioridade): void {
    const usuarioAtual = this.authService.obterUsuarioAtual();
    if (!usuarioAtual) return;

    const novaTarefa: Tarefa = {
      id: Date.now(),
      usuarioId: usuarioAtual,
      titulo,
      descricao,
      concluida: false,
      criadaEm: new Date(),
      prioridade
    };

    this.tarefas.next([...this.tarefas.value, novaTarefa]);
    this.salvarTarefas();
  }

  alternarTarefa(id: number): void {
    const usuarioAtual = this.authService.obterUsuarioAtual();
    if (!usuarioAtual) return;

    const tarefasAtualizadas = this.tarefas.value.map(tarefa =>
      tarefa.id === id && tarefa.usuarioId === usuarioAtual
        ? { ...tarefa, concluida: !tarefa.concluida }
        : tarefa
    );
    this.tarefas.next(tarefasAtualizadas);
    this.salvarTarefas();
  }

  excluirTarefa(id: number): void {
    const usuarioAtual = this.authService.obterUsuarioAtual();
    if (!usuarioAtual) return;

    const tarefasAtualizadas = this.tarefas.value.filter(
      tarefa => !(tarefa.id === id && tarefa.usuarioId === usuarioAtual)
    );
    this.tarefas.next(tarefasAtualizadas);
    this.salvarTarefas();
  }

  atualizarTarefa(tarefaAtualizada: Tarefa): void {
    const usuarioAtual = this.authService.obterUsuarioAtual();
    if (!usuarioAtual) return;

    const tarefasAtualizadas = this.tarefas.value.map(tarefa =>
      tarefa.id === tarefaAtualizada.id && tarefa.usuarioId === usuarioAtual
        ? tarefaAtualizada
        : tarefa
    );
    this.tarefas.next(tarefasAtualizadas);
    this.salvarTarefas();
  }
}