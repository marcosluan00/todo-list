import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  isSubmitting = false;
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}


  async login() {
    this.isSubmitting = true;
    this.loginError = null;

    try {
      this.isSubmitting = true;
      const success = await this.authService.login(this.email.trim(), this.senha.trim());
      if (success) {
        this.router.navigate(['/todo']);
      } else {
      this.loginError = 'Credenciais inválidas. Por favor, tente novamente.';
    }
    } catch (error) {
      console.log(error)
    } finally {
      this.isSubmitting = false;
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastrar']);
  }
}
