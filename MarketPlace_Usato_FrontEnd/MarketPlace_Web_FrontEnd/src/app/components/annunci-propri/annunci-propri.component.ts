import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Annuncio } from '../../models/annuncio';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-annunci-propri',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annunci-propri.component.html',
  styleUrls: ['./annunci-propri.component.css']
})
export class AnnunciPropriComponent implements OnInit {
  annunci: Annuncio[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  private userUuid: string | null;

  constructor(private listService: ListService) {
    this.userUuid = localStorage.getItem('userUuid');
  }

  ngOnInit(): void {
    this.loadAnnunciPropri();
  }

  loadAnnunciPropri(): void {
    if (!this.userUuid) {
      this.errorMessage = 'Utente non autenticato';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.listService.getAnnunciByUser(this.userUuid).subscribe({
      next: (data) => {
        this.annunci = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Errore durante il caricamento degli annunci:', err);
        this.errorMessage = 'Errore nel caricamento degli annunci';
        this.isLoading = false;
      }
    });
  }
}