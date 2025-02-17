import { Component } from '@angular/core';
import { Prioridade } from '../../models/todo.interface';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  titulo: string = '';
  descricao: string = '';
  prioridade: Prioridade = 'MEDIA';

  prioridades: { valor: Prioridade; rotulo: string; cor: string }[] = [
    { valor: 'ALTA', rotulo: 'Alta', cor: 'danger' },
    { valor: 'MEDIA', rotulo: 'Média', cor: 'warning' },
    { valor: 'BAIXA', rotulo: 'Baixa', cor: 'success' }
  ];

  constructor(private tarefaService: TodoService) {}

  aoEnviar(): void {
    if (this.titulo.trim()) {
      this.tarefaService.adicionarTarefa(this.titulo.trim(), this.descricao.trim(), this.prioridade);
      this.titulo = '';
      this.descricao = '';
      this.prioridade = 'MEDIA';
    }
  }
}
