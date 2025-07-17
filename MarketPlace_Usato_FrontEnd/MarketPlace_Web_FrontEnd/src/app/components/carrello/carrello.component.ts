import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Carrello } from '../../models/carrello';
import { Annuncio } from '../../models/annuncio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrello',
  imports: [ CommonModule ],
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

  removeCarrello(annuncio: Annuncio): void {
    this.cartService.removeCarrello(this.carrello!.uuid, annuncio).subscribe(() => {    
      this.cartService.getCarrello(this.carrello!.userUuid).subscribe(updated => {
        this.carrello = updated;
      });
    });
  }
}
