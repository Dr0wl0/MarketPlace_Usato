import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Annuncio } from '../../models/annuncio';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-carrello',
  imports: [],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent {

  private router: Router = new Router;
  private cartService!: CartService;
  private carrello: CartItem[] = [];
  private userUuid = localStorage.getItem('userUuid');

  ngOnInit(): void {

    if (!this.userUuid) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadCarrello(this.userUuid);
  } 

  private loadCarrello(uudi: string){
    this.cartService.getCarrello(uudi)
  };
}
