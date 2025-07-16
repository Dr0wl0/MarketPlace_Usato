import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,tap,catchError,of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserName = new BehaviorSubject<string>('');
  private currentUserEmail = new BehaviorSubject<string>('');
  
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUserName$ = this.currentUserName.asObservable();
  currentUserEmail$ = this.currentUserEmail.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkInitialAuthState();
  }

  getIsLoggedInSync(): boolean {
  return this.isLoggedInSubject.value; 
}

  private checkInitialAuthState(): void {
    const isLoggedIn = !!localStorage.getItem('userUuid');
    this.isLoggedInSubject.next(isLoggedIn);
    this.currentUserName.next(localStorage.getItem('userName') || '');
    this.currentUserEmail.next(localStorage.getItem('userEmail') ||'');
  }

  login(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/log`, { username, email, password }, {
      withCredentials: true
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  updateUser(username: string, password: string): Observable<any> {
  const userUuid = localStorage.getItem('userUuid');
  
  if (!userUuid) {
    this.logout();
    return of(null); // o lancia un errore con `throwError`
  }

  return this.http.patch(`${this.apiUrl}/${userUuid}`, { 
    username, 
    password 
  }).pipe(
    tap(() => {
      // Aggiorna localStorage solo se la chiamata ha successo
      localStorage.setItem('userName', username);
    }),
    catchError(error => {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      throw error; // Rilancia l'errore per gestirlo nel componente
    })
  );
}

  // Nuovi metodi per gestire lo stato
  handleSuccessfulLogin(response: any): void {
    localStorage.setItem('userUuid', response.uuid);
    localStorage.setItem('userName', response.username);
    this.isLoggedInSubject.next(true);
    this.currentUserName.next(response.username);
    this.router.navigate(['/annunci']);
  }

  logout(): void {
    localStorage.removeItem('userUuid');
    localStorage.removeItem('userName');
    this.isLoggedInSubject.next(false);
    this.currentUserName.next('');
    this.router.navigate(['/login']);
  }

  updateUserName(newName: string): void {
    localStorage.setItem('userName', newName);
    this.currentUserName.next(newName);
  }

  getCurrentUserUuid(): string | null {
    return localStorage.getItem('userUuid');
  }
}