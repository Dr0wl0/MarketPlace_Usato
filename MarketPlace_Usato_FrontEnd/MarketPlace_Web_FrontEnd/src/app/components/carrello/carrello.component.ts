import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Carrello } from '../../models/carrello';
import { Annuncio } from '../../models/annuncio';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cartItem';

@Component({
  standalone: true,
  selector: 'app-carrello',
  imports: [CommonModule],
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello!: Carrello | null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const userUuid = localStorage.getItem('userUuid');
    if (userUuid) {
      this.cartService.getCarrello(userUuid).subscribe((carrello: Carrello) => {
        this.carrello = carrello;
      });
    }
  }

  removeCarrello(annuncio: CartItem): void {
    this.cartService.removeFromCarrello(this.carrello!.uuid, annuncio).subscribe(updatedCarrello => {
      this.carrello = updatedCarrello;
    });
  }

  get totalPrice(): number {
  if (!this.carrello?.items?.length) {
    return 0;
  }
  return this.carrello.items
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
  
}
