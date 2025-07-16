import { Component, HostListener, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/categoria';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './mostra-lista.component.html',
  styleUrl: './mostra-lista.component.css'
})
export class MostraListaComponent implements OnInit{
  annunci: Annuncio[] = [];
  categorie: Category[] = [];
  currentView: 'list' | 'form' = 'list';

  newAnnuncio: Partial<Annuncio> = {
    listingName: '',
    description: '',
    price: 0,
    categoryName: ''
  };

  selectedCategory: string | null = null;

  showScrollButton = false;

  constructor(
  private listService: ListService, 
  private http: HttpClient,
  private router: Router
) {}


  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  ngOnInit(): void {
    /*
    if (!localStorage.getItem('userUuid')) {
    this.router.navigate(['/login']);
    return;
  }
  */
  this.loadAnnuncio();
  this.loadCategorie();
}


  
  loadAnnuncio(): void {
    this.listService.getAnnunci().subscribe((data) => {
      this.annunci = data || [];
    });
  }

  loadCategorie(): void {
    this.http.get<Category[]>('http://localhost:8080/api/v1/category')
      .subscribe((data) => {
        this.categorie = data;
      });
  }

  get filteredAnnunci(): Annuncio[] {
    if (!this.selectedCategory) return this.annunci;
    return this.annunci.filter(a => a.categoryName === this.selectedCategory);
  }

  publishAnnuncio(): void {
    const { listingName, description, price, categoryName } = this.newAnnuncio;

    if (!listingName || !description || !price || !categoryName) {
      alert("Compila tutti i campi prima di pubblicare l'annuncio.");
      return;
    }

    const userUuid = localStorage.getItem('userUuid');
    if (!userUuid) {
      alert('Utente non loggato. Effettua il login per pubblicare un annuncio.');
      return;
    }

    const annuncioToSend: Annuncio = {
      listingName,
      description,
      price,
      categoryName,
      favourite: false,
      uuid: '',
      userUuid
    };

    this.listService.addAnnuncio(annuncioToSend).subscribe(() => {
      this.newAnnuncio = {
        listingName: '',
        description: '',
        price: 0,
        categoryName: ''
      };
      this.loadAnnuncio();
      this.currentView = 'list';
    });
  }

  toggleFavourite(annuncio: Annuncio): void {
    const newStatus = !annuncio.favourite;
    this.listService.updateFavouriteStatus(annuncio.uuid, newStatus).subscribe({
      next: (updatedAnnuncio) => {
        annuncio.favourite = updatedAnnuncio.favourite;
      },
      error: () => {
        alert('Errore nel modificare il preferito');
      }
    });
  }

  addCarrello(annuncio: Annuncio): void {
    
  }
}
