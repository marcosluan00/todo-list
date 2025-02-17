import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent }
  
];
