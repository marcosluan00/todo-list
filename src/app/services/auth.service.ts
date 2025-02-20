import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly CHAVE_USUARIO = 'usuarios';
  private readonly CHAVE_AUTH = 'auth';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async login(email: string, senha: string): Promise<boolean> {
    if (this.isBrowser) {
      const usuariosArmazenados = localStorage.getItem(this.CHAVE_USUARIO);
      if (usuariosArmazenados) {
        const usuarios = JSON.parse(usuariosArmazenados);
        const usuario = usuarios.find((u: any) => u.email === email && u.senha === senha);
        if (usuario) {
          localStorage.setItem(this.CHAVE_AUTH, email);
          return true;
        }
      }
    }
    return false;
  }

  registrar(email: string, senha: string): void {
    if (this.isBrowser) {
      const usuariosArmazenados = localStorage.getItem(this.CHAVE_USUARIO);
      const usuarios = usuariosArmazenados ? JSON.parse(usuariosArmazenados) : [];
      usuarios.push({ email, senha });
      localStorage.setItem(this.CHAVE_USUARIO, JSON.stringify(usuarios));
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.CHAVE_AUTH);
    }
  }

  isAuthenticated(): boolean {
    return this.isBrowser && localStorage.getItem(this.CHAVE_AUTH) !== null;
  }

  obterUsuarioAtual(): string | null {
    return this.isBrowser ? localStorage.getItem(this.CHAVE_AUTH) : null;
  }
}