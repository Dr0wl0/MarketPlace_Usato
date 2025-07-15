
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { Category } from '../../models/Category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink],
  templateUrl: './mostra-lista.component.html',
})
export class MostraListaComponent implements OnInit {
  annunci: Annuncio[] = [];

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

    // Type assertion per garantire che i tipi siano corretti
    const annuncioToSend: Annuncio = {
      name: this.newAnnuncio.name,
      category: this.newAnnuncio.category as Category,
      sellersName: '',
      description: '',
      price: 0,
      favourite: false,
      id: 0
    };

    this.listService.addAnnuncio(annuncioToSend).subscribe(() => {
      this.newAnnuncio = { name: '', category: Category.FOOD }; // reset form
      this.loadAnnuncio(); // aggiorna la lista
    });
  }
}

