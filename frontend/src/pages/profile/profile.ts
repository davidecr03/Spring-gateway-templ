import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
private userService = inject(UserService);
  private router = inject(Router);

  // Esempio: recuperiamo l'email salvata nel localStorage (o dal backend)
  userEmail = localStorage.getItem('userEmail'); 


  //per i dati che arrivano dal backend
user: any;


ngOnInit() {
  this.userService.getProfile().subscribe({
    next: (data) => {
      this.user = data;
    },
    error: (err) => {
      console.error("Token non valido o scaduto!");
      // SE IL TOKEN È SBAGLIATO (es. 1111...), CANCELLIAMOLO E TORNIAMO AL LOGIN
      this.userService.logout(); 
      this.router.navigate(['/login']); 
    }
  });
}


  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


}
