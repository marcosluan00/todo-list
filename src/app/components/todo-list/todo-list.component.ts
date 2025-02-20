import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { Prioridade, Tarefa } from '../../models/todo.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  animations: [
    trigger('animacaoTarefa', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {
  tarefas$!: Observable<Tarefa[]>;

  prioridades: { valor: Prioridade; rotulo: string; cor: string }[] = [
    { valor: 'ALTA', rotulo: 'Alta Prioridade', cor: 'danger' },
    { valor: 'MEDIA', rotulo: 'Média Prioridade', cor: 'warning' },
    { valor: 'BAIXA', rotulo: 'Baixa Prioridade', cor: 'success' }
  ];

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tarefas$ = this.todoService.obterTarefas();
  }

  obterTarefasPorPrioridade(prioridade: Prioridade): Tarefa[] {
    return this.todoService.obterTarefasPorPrioridade(prioridade);
  }

  alternarTarefa(id: number): void {
    this.todoService.alternarTarefa(id);
  }

  excluirTarefa(id: number): void {
    this.todoService.excluirTarefa(id);
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
