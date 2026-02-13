import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/auth'; // Chiamiamo il GATEWAY

login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    tap((res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userEmail', res.email); // Salviamo l'email per il profilo
    })
  );
}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
  }


  // esempio rotta PRIVATA
getProfile(): Observable<any> {
  // Nota l'URL che punta a /users invece di /auth
  return this.http.get('http://localhost:8080/users/profile');
}

}