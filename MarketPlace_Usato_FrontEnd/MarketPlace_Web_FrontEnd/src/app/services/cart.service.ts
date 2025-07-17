import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cartItem';
import { Carrello } from '../models/carrello';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/v1/cart';

  constructor(private http: HttpClient) {}

  createCarrello(userUuid: string): Observable<Carrello> {
    return this.http.post<Carrello>(`${this.apiUrl}`, userUuid);
  }

  getCarrello(uuid: string): Observable<Carrello> {
    return this.http.get<Carrello>(`${this.apiUrl}/${uuid}`);
  }

  addToCarrello(uuid: string, annuncio: CartItem): Observable<Carrello> {
    return this.http.post<Carrello>(`${this.apiUrl}/${uuid}/add`, annuncio);
  }

  removeFromCarrello(uuid: string, annuncio: CartItem): Observable<Carrello> {
    return this.http.delete<Carrello>(`${this.apiUrl}/${uuid}/remove/${annuncio.listingUuid}`);
  }

  clearCarrello(uuid: string): Observable<Carrello> {
    return this.http.delete<Carrello>(`${this.apiUrl}/${uuid}/clear`);
  }
}
