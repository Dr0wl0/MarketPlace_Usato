import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Annuncio } from '../../models/annuncio';

@Component({
  selector: 'app-carrello',
  imports: [],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent {

  private router: Router = new Router;
  private cartService!: CartService;
  private carrello: Annuncio[] = [];
  private userID = localStorage.getItem('userUuid');

  ngOnInit(): void {

    if (!this.userID) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadCarrello(this.userID);
  } 

  private loadCarrello(uudi: string){
    this.cartService.getCarrello(uudi)
  };
}
