import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-annuncio-detail',
  imports:[CommonModule,RouterLink],
  templateUrl: './annuncio-detail.component.html',
  styleUrls: ['./annuncio-detail.component.css']
})
export class AnnuncioDetailComponent implements OnInit {
  annuncio: Annuncio | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    
    if (uuid) {
      this.loadAnnuncio(uuid);
    } else {
      this.errorMessage = 'Annuncio non trovato';
      this.isLoading = false;
    }
  }

  loadAnnuncio(uuid: string): void {
    this.listService.getAnnuncioByUuid(uuid).subscribe({
      next: (data) => {
        this.annuncio = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento:', err);
        this.errorMessage = 'Errore nel caricamento dell\'annuncio';
        this.isLoading = false;
      }
    });
  }

  toggleFavourite(): void {
    if (!this.annuncio) return;
    
    const userUuid = localStorage.getItem('userUuid');
    if (!userUuid) {
      this.errorMessage = 'Devi effettuare il login';
      return;
    }

    this.listService.updateFavouriteStatus(
      userUuid, 
      this.annuncio.uuid,
    ).subscribe({
      next: (updatedAnnuncio) => {
        if (this.annuncio) {
          this.annuncio.favourite = updatedAnnuncio.favourite;
        }
      },
      error: (err) => {
        console.error('Errore:', err);
        this.errorMessage = 'Errore nell\'aggiornamento';
      }
    });
  }
}