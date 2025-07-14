import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/login'; // Sostituisci con il tuo endpoint

  constructor(private http: HttpClient) {}

  // Login (come prima)
  login(username: string, password: string):Observable<any> {
    return this.http.post(`${this.apiUrl}/log`, { username, password });
  }

  // Nuovo metodo register
  register(nomeCognome: string,username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { nomeCognome, username, password });
  }
}
