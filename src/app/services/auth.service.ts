import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly CHAVE_USUARIO = 'usuario';

  constructor() {}

  login(email: string, senha: string): boolean {
    const usuarioArmazenado = localStorage.getItem(this.CHAVE_USUARIO);
    if (usuarioArmazenado) {
      const usuario = JSON.parse(usuarioArmazenado);
      if (usuario.email === email && usuario.senha === senha) {
        localStorage.setItem('auth', 'true');
        return true;
      }
    }
    return false;
  }

  registrar(email: string, senha: string): void {
    const usuario = { email, senha };
    localStorage.setItem(this.CHAVE_USUARIO, JSON.stringify(usuario));
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
