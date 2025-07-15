
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { Category } from '../../models/Category';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './mostra-lista.component.html',
})

export class MostraListaComponent implements OnInit {
  annunci: Annuncio[] = [];

  currentView: 'list' | 'form' = 'list';

  newAnnuncio: Partial<Annuncio> = {
    name: '',
    category: Category.FOOD
  };

  categoryLabels: { [key in Category]: string } = {
    [Category.FOOD]: 'Cibo',
    [Category.ELECTRONICS]: 'Elettronica',
    [Category.CLOTHING]: 'Abbigliamento',
  };

  getCategoryLabel(category: Category): string {
  return this.categoryLabels[category] ?? category;
  }

  selectedCategory: Category | null = null;

  get filteredAnnunci(): Annuncio[] {
    if (!this.selectedCategory) {
      return this.annunci;
    }

    return this.annunci.filter(
      (annuncio) => annuncio.category === this.selectedCategory
    );
  } 

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getAnnunci().subscribe((data) => {
      this.annunci = data;
    });
  }

  loadAnnuncio(): void {
    this.listService.getAnnunci().subscribe((data) => {
      this.annunci = data;
    });
  }

  publishAnnuncio(): void {
    if (!this.newAnnuncio.name || !this.newAnnuncio.category) return;

    const userUuid = localStorage.getItem('userUuid'); 

    if (!userUuid) {
      alert('Utente non loggato. Effettua il login per pubblicare un annuncio.');
      return;
    }

    const annuncioToSend: Annuncio = {
      name: this.newAnnuncio.name,
      category: this.newAnnuncio.category as Category,
      sellersName: '', 
      description: '',       
      price: 0,
      favourite: false,
      uuid: 0,
      userid: userUuid
    };

    this.listService.addAnnuncio(annuncioToSend).subscribe(() => {
      this.newAnnuncio = { name: '', category: Category.FOOD }; 
      this.loadAnnuncio(); 
      this.currentView = 'list';
    });
  }

  toggleFavourite(annuncio: Annuncio): void {
  const newStatus = !annuncio.favourite;
  this.listService.updateFavouriteStatus(annuncio.uuid, newStatus).subscribe({
    next: (updatedAnnuncio) => {
      annuncio.favourite = updatedAnnuncio.favourite; // aggiorna localmente
    },
    error: () => {
      alert('Errore nel modificare il preferito');
    }
  });
}
}

