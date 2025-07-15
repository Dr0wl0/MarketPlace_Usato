import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserNameSubject = new BehaviorSubject<string>('');
  
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUserName$ = this.currentUserNameSubject.asObservable();

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
    this.currentUserNameSubject.next(localStorage.getItem('userName') || '');
  }

  // Metodi esistenti
  login(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/log`, { username, email, password }, {
      withCredentials: true
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  // Nuovi metodi per gestire lo stato
  handleSuccessfulLogin(response: any): void {
    localStorage.setItem('userUuid', response.uuid);
    localStorage.setItem('userName', response.username);
    this.isLoggedInSubject.next(true);
    this.currentUserNameSubject.next(response.username);
    this.router.navigate(['/annunci']);
  }

  logout(): void {
    localStorage.removeItem('userUuid');
    localStorage.removeItem('userName');
    this.isLoggedInSubject.next(false);
    this.currentUserNameSubject.next('');
    this.router.navigate(['/login']);
  }

  updateUserName(newName: string): void {
    localStorage.setItem('userName', newName);
    this.currentUserNameSubject.next(newName);
  }

  getCurrentUserUuid(): string | null {
    return localStorage.getItem('userUuid');
  }
}