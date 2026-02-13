import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

if (token) {
    return true; // Utente loggato, resta dove sei
  } else {
    router.navigate(['/login']);
    return false;
  }
};