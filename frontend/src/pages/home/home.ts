import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  // Aggiungiamo CommonModule per gestire la logica nel template
  imports: [RouterLink, CommonModule], 
  template: `
    <div class="home-container">
      <header>
        <h1>Microservices Stack Template</h1>
        <p>Spring Boot Cloud Gateway + Angular Standalone</p>
      </header>
      
      <main class="actions">
        <div class="card">
          @if (isLoggedIn()) {
            <h3>Bentornato!</h3>
            <p>Sei loggato come: <strong>{{ getUserEmail() }}</strong></p>
            <div class="btn-group">
              <button routerLink="/profile" class="btn-primary">Il mio Profilo</button>
              <button (click)="logout()" class="btn-danger">Logout</button>
            </div>
          } 
          @else {
            <h3>Benvenuto</h3>
            <p>Gestisci la tua identità in modo sicuro tramite il nostro sistema a microservizi.</p>
            <div class="btn-group">
              <button routerLink="/login" class="btn-primary">Accedi</button>
              <button routerLink="/register" class="btn-secondary">Registrati ora</button>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .home-container { text-align: center; padding: 50px; font-family: sans-serif; }
    header h1 { color: #2c3e50; font-size: 2.5rem; }
    .actions { display: flex; justify-content: center; margin-top: 30px; }
    .card { border: 1px solid #ddd; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px; }
    .btn-group { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
    button { padding: 10px 20px; border-radius: 6px; cursor: pointer; border: none; font-weight: bold; transition: opacity 0.2s; }
    button:hover { opacity: 0.8; }
    .btn-primary { background: #007bff; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
    .btn-danger { background: #dc3545; color: white; }
  `]
})
export class HomeComponent {
  private router = inject(Router);

  // Controlla se il token è presente nel localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Recupera l'email salvata durante il login
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Pulisce il storage e torna al login o resta in home
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}