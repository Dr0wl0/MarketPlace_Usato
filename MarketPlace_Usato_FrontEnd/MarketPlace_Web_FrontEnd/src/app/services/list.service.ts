import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annuncio } from '../models/annuncio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api/v1/listing'; // URL del backend

  constructor(private http: HttpClient) {}

  getAnnunci(): Observable<Annuncio[]> {
    return this.http.get<Annuncio[]>(this.apiUrl);
  }

  addAnnuncio(annuncio: Annuncio): Observable<Annuncio> {
    return this.http.post<Annuncio>(this.apiUrl, annuncio);
  }
    
  updateFavouriteStatus(id: number, favourite: boolean): Observable<Annuncio> {
    return this.http.put<Annuncio>(
      this.apiUrl+'${id}/favourite',
      null,
      { params: { favourite } }
    );
  }
}