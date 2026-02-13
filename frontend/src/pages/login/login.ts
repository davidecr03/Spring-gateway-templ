import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <input [(ngModel)]="email" placeholder="Email" type="email">
      <input [(ngModel)]="password" placeholder="Password" type="password">
      <button (click)="handleLogin()">Entra</button>
    </div>
  `
})
export class LoginComponent {
  email = ''; password = '';
  private auth = inject(UserService);
  private router = inject(Router);

  handleLogin() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe(() => this.router.navigate(['/profile']));
  }
}