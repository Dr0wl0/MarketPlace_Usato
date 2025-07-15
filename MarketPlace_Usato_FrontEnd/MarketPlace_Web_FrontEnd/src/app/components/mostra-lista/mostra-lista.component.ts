
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { Category } from '../../models/Category';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './mostra-lista.component.html',
})
export class MostraListaComponent implements OnInit {
  annunci: Annuncio[] = [];

  newAnnuncio: Partial<Annuncio> = {
    listingName: '',
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
    if (!this.newAnnuncio.listingName || !this.newAnnuncio.category) return;

    // Type assertion per garantire che i tipi siano corretti
    const annuncioToSend: Annuncio = {
      uuid: '',
      userUuid: '',
      listingName: this.newAnnuncio.listingName,
      category: this.newAnnuncio.category as Category,
      sellersName: '',
      description: '',
      price: 0,
      favourite: false
    };

    this.listService.addAnnuncio(annuncioToSend).subscribe(() => {
      this.newAnnuncio = { listingName: '', category: Category.CARS }; // reset form
      this.loadAnnuncio(); // aggiorna la lista
    });
  }
}

