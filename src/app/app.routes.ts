import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'todo', pathMatch: 'full' },
    { path: 'todo', component: TodoListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'cadastrar', component: CadastrarComponent },
];
