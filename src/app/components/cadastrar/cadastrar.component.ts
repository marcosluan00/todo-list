import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  email: string = '';
  senha: string = '';
  errors: { email?: string; senha?: string } = {};
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  validarFormulario(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.email || !this.email.trim()) {
      this.errors.email = 'O email é obrigatório';
      isValid = false;
    } else if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.errors.email = 'Digite um email válido';
      isValid = false;
    }

    if (!this.senha || !this.senha.trim()) {
      this.errors.senha = 'A senha é obrigatória';
      isValid = false;
    } else if (this.senha.length < 6) {
      this.errors.senha = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    return isValid;
  }

  async registrar() {
    if (this.isSubmitting) return;
    
    if (!this.validarFormulario()) {
      return;
    }
    const senhaValida = this.validarSenha(this.senha);
    if (!senhaValida) {
      this.errors.senha = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um caractere especial.';
      this.isSubmitting = false;
      return;
    }

    try {
      this.isSubmitting = true;
      await this.authService.registrar(this.email.trim(), this.senha.trim());
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  validarSenha(senha: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    return regex.test(senha);
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}
