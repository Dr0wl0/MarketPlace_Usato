
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { Category } from '../../models/Category';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mostra-lista.component.html',
  styleUrl:'./mostra-lista.component.css'
})
export class MostraListaComponent implements OnInit {
  annunci: Annuncio[] = [];
  currentView: 'list' | 'form' = 'list';

  newAnnuncio: Partial<Annuncio> = {
    listingName: '',
    description: '',
    price: 0,
    category: Category.CARS
  };

  categoryLabels: { [key in Category]: string } = {
    [Category.CARS]: 'Macchine',
    [Category.ELECTRONICS]: 'Elettronica',
    [Category.MOTORBIKES]: 'Moto',
    [Category.SPORTS]: 'Sports',
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
      console.log('Dati ricevuti:', data);
      this.annunci = data || [];
    });
  }

  loadAnnuncio(): void {
    this.listService.getAnnunci().subscribe((data) => {
      this.annunci = data || [];
    });
  }

  publishAnnuncio(): void {
    if (!this.newAnnuncio.listingName || !this.newAnnuncio.description || !this.newAnnuncio.price) return;

    const userUuid = localStorage.getItem('userUuid');

    if (!userUuid) {
      alert('Utente non loggato. Effettua il login per pubblicare un annuncio.');
      return;
    }

    const annuncioToSend: Annuncio = {
      listingName: this.newAnnuncio.listingName,
      category: this.newAnnuncio.category as Category,
      description: this.newAnnuncio.description, 
      price: this.newAnnuncio.price, 
      favourite: false,
      uuid: '',
      userUuid: userUuid
    };

    this.listService.addAnnuncio(annuncioToSend).subscribe(() => {
      this.newAnnuncio = { listingName: '', category: Category.CARS,description: '', price: 0, userUuid: userUuid }; 
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

