import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annuncio } from '../models/annuncio';
import { Carrello } from '../models/carrello';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/v1/cart'; // URL del backend

  constructor(private http: HttpClient) {}

  createCarrello(uuid: string): Observable<Carrello> {
    return this.http.get<Carrello>(this.apiUrl);
  }

  getCarrello(uuid: string): Observable<Carrello> {
    return this.http.get<Carrello>(`${this.apiUrl}/${uuid}`);
  }

  addCarrello(uuid: string, annuncio: Annuncio): Observable<Carrello> {
    return this.http.post<Carrello>(this.apiUrl+'/'+uuid+'/add', annuncio);
  }

  removeCarrello(uuid: string, annuncio: Annuncio): Observable<Carrello> {
    this.http.get<Carrello>(this.apiUrl+'/'+uuid+'/remove/'+annuncio.uuid);
    return this.getCarrello(uuid)
  }

  clearCarrello(uuid: string): Observable<Carrello> {
    this.http.get<Carrello>(this.apiUrl+'/'+uuid+'/clear');
    return this.getCarrello(uuid)
  }
}