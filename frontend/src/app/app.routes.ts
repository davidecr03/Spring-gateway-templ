import { Routes } from '@angular/router';
import { authGuard } from '../guard/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('../pages/home/home').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('../pages/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('../pages/register/register').then(m => m.RegisterComponent) },
  { path: 'profile', 
    loadComponent: () => import('../pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' } // Catch-all per reindirizzare alla home se l'URL è errato
];