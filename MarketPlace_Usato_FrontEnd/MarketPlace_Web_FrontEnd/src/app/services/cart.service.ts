import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annuncio } from '../models/annuncio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/v1/cart'; // URL del backend

  constructor(private http: HttpClient) {}

  getCarrello(uuid: string): Observable<Annuncio[]> {
    return this.http.get<Annuncio[]>(this.apiUrl+uuid);
  }

}