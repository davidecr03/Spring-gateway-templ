import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service'; // Assicurati che il percorso sia corretto
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink,CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Crea un Account</h2>
        <form (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="user.email" name="email" required #email="ngModel">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="user.password" name="password" required>
          </div>
          <button type="submit" [disabled]="!registerForm.valid">Registrati</button>
        </form>
        <p>Hai già un account? <a routerLink="/login">Accedi qui</a></p>
        <p *ngIf="message">{{message}}</p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; height: 80vh; }
    .auth-card { border: 1px solid #ddd; padding: 30px; border-radius: 8px; width: 350px; }
    .form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
    input { padding: 8px; margin-top: 5px; }
    button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background: #ccc; }
    a { color: #007bff; text-decoration: none; }
  `]
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  user = { email: '', password: '' };
  message = '';

  onRegister() {
    this.userService.register(this.user).subscribe({
      next: (res) => {
        this.message = 'Registrazione completata! Reindirizzamento...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = 'Errore durante la registrazione. Riprova.';
        console.error(err);
      }
    });
  }
}