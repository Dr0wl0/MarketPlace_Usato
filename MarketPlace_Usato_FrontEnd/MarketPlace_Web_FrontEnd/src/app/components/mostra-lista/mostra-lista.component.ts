import { Component, HostListener, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/categoria';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
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
  searchTerm: string = '';
  maxPrice: number | null = null;
  annunciFiltrati: Annuncio[] = [];

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
  private cartService: CartService,
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
   this.listService.getAnnunci().subscribe((annunci) => {
    this.listService.getAnnunciByFavorite().subscribe((favAnnunci) => {
      this.annunci = annunci.map(a => ({
        ...a,
        favourite: favAnnunci.some(fav => fav.uuid === a.uuid)

        
      }));
      this.applyFilters();
      this.annunciFiltrati = this.annunci;

    });
  });
  }

  loadCategorie(): void {
    this.http.get<Category[]>('http://localhost:8080/api/v1/category')
      .subscribe((data) => {
        this.categorie = data;
      });
  }

  get filteredByCategory(): Annuncio[] {
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
  const userUuid = localStorage.getItem('userUuid');
  
  if (!userUuid) {
    alert('Utente non autenticato!');
    return;
  }

  this.listService.updateFavouriteStatus(userUuid, annuncio.uuid).subscribe({
    next: () => {
    
      annuncio.favourite = !annuncio.favourite;
    },
    error: (err) => {
      console.error('Errore:', err);
      alert('Errore durante l\'aggiornamento dei preferiti');
    }
  });
}

applyFilters(): void {
  this.annunciFiltrati = this.annunci.filter(a => {
    const matchesCategory = !this.selectedCategory || a.categoryName === this.selectedCategory;
    const matchesSearch = !this.searchTerm || a.listingName.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesPrice = !this.maxPrice || a.price <= this.maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });
  }

  addCarrello(annuncio: Annuncio): void {
    this.cartService.getCarrello(annuncio.uuid);
  }

  filtraPerNome(): void {
     if (!this.searchTerm || this.searchTerm.trim() === '') {
    return;
  }

  this.listService.filtraPerNome(this.searchTerm).subscribe({
    next: (annunciFiltrati) => {
      console.log('Annunci filtrati ricevuti:', annunciFiltrati);
      this.annunciFiltrati = annunciFiltrati;
    },
    error: (err) => {
      console.error('Errore nella ricerca:', err);
    }
  });
  }

  filtraPerPrezzo(): void {
    if (!this.maxPrice || this.maxPrice === null) {
      return;
    }

    this.listService.filtraPerPrezzo(this.maxPrice).subscribe({
      next: (annunciFiltrati) => {
        this.annunciFiltrati = annunciFiltrati;
      },

      error: (err) => {
      console.error('Errore nella ricerca:', err);
    }
    })
  }
}
