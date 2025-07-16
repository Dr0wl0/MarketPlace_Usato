import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annuncio } from '../models/annuncio';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api/v1/listings'; // URL del backend

  constructor(private http: HttpClient) {}

  getAnnuncio(): Observable<Annuncio> {
    return this.http.get<Annuncio>(`this.apiUrl+${localStorage.getItem}`)
  }

  getAnnunci(): Observable<Annuncio[]> {
    return this.http.get<Annuncio[]>(this.apiUrl);
  }

  addAnnuncio(annuncio: Annuncio): Observable<Annuncio> {
  return this.http.post<Annuncio>(this.apiUrl, annuncio);
  }

  getAnnunciByUser(userUuid: string): Observable<Annuncio[]> {
  return this.http.get<Annuncio[]>(`${this.apiUrl}/user/${userUuid}`);
}

  getAnnunciByFavorite(): Observable<Annuncio[]> {
    return this.http.get<Annuncio[]>(`${this.apiUrl}/favorites`)
  }

  updateFavouriteStatus(userUuid: string, listingUuid: string): Observable<Annuncio> {
  if (!userUuid || !listingUuid) {
    return throwError(() => new Error('User UUID and Listing UUID are required'));
  }
  const url = `${this.apiUrl}/${userUuid}/${listingUuid}/favorite`;
  
  const body = {};
  
  return this.http.patch<Annuncio>(url, body).pipe(
    catchError(error => {
      console.error('Error updating favorite status:', error);
      return throwError(() => error);
    })
  );
  }

  filtraPerNome(listingName: string): Observable<Annuncio[]> {
    return this.http.get<Annuncio[]>(`${this.apiUrl}/search/${listingName}`);
  }

  filtraPerPrezzo( prezzoMax: number ): Observable<Annuncio[]>{
    return this.http.get<Annuncio[]>(`${this.apiUrl}/search/price/${prezzoMax}`)
  }

  eliminaAnnuncioDiUser( uuid: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`)
  }

}
