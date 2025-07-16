import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Annuncio } from '../../models/annuncio';
import { ListService } from '../../services/list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-annunci-preferiti',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './annunci-preferiti.component.html',
  styleUrl: './annunci-preferiti.component.css'
})
export class AnnunciPreferitiComponent {
  favoriteAnnunci: Annuncio[] = [];
  currentView: 'list' | 'form' = 'list';
  selectedCategory: string | null = null;

  constructor(
      private listService: ListService,
    ) {}

    ngOnInit(): void {
    this.loadFavoriteAnnunci();
  }

  loadFavoriteAnnunci(): void {
    this.listService.getAnnunciByFavorite().subscribe(annunci => {
      this.favoriteAnnunci = annunci;
    });
  }

  toggleFavourite(annuncio: Annuncio): void {
  const userUuid = localStorage.getItem('userUuid');

  if (!userUuid) {
    alert('Utente non autenticato!');
    return;
  }

  this.listService.updateFavouriteStatus(userUuid, annuncio.uuid).subscribe({
    next: () => {
      const index = this.favoriteAnnunci.findIndex(a => a.uuid === annuncio.uuid);
      if (index !== -1) {
        this.favoriteAnnunci[index].favourite = false;

        this.favoriteAnnunci.splice(index, 1);
      }
    },
    error: (err) => {
      console.error('Errore:', err);
      alert('Errore durante l\'aggiornamento dei preferiti');
    }
  });
}

  addCarrello(annuncio: Annuncio): void {
    
  }


}
