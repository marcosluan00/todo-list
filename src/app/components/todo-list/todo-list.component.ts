import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Prioridade, Tarefa } from '../../models/todo.interface';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [TodoFormComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  animations: [
    trigger('animacaoTarefa', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class TodoListComponent {
  tarefas$!: Observable<Tarefa[]>;

  prioridades: { valor: Prioridade; rotulo: string; cor: string }[] = [
    { valor: 'ALTA', rotulo: 'Alta Prioridade', cor: 'danger' },
    { valor: 'MEDIA', rotulo: 'Média Prioridade', cor: 'warning' },
    { valor: 'BAIXA', rotulo: 'Baixa Prioridade', cor: 'success' }
  ];

  constructor(
    private tarefaService: TodoService,
  ) {
    this.tarefas$ = this.tarefaService.obterTarefas();
  }

  obterTarefasPorPrioridade(prioridade: Prioridade): Tarefa[] {
    return this.tarefaService.obterTarefasPorPrioridade(prioridade);
  }


  alternarTarefa(id: number): void {
    this.tarefaService.alternarTarefa(id);
  }

  excluirTarefa(id: number): void {
    this.tarefaService.excluirTarefa(id);
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
