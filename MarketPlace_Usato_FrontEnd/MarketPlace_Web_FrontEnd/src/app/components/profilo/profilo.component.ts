import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';
import { Annuncio } from '../../models/annuncio';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent {
  userAnnunci: Annuncio[] = [];
  favoriteAnnunci: Annuncio[] = [];
  annunciFiltrati: Annuncio[] = [];

  constructor(
    public authService: AuthService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.loadUserAnnunci();
    this.loadFavoriteAnnunci();
  }

  loadUserAnnunci(): void {
    const userUuid = localStorage.getItem('userUuid');
    if (userUuid) {
      this.listService.getAnnunciByUser(userUuid).subscribe(annunci => {
        this.userAnnunci = annunci;
      });
    }
  }

  loadFavoriteAnnunci(): void {
    this.listService.getAnnunciByFavorite().subscribe(annunci => {
      this.favoriteAnnunci = annunci;
    });
  }
  

  eliminaAnnuncioDiUser(uuid: string): void {
    this.listService.eliminaAnnuncioDiUser(uuid).subscribe({
      next: () => {
        this.userAnnunci = this.userAnnunci.filter(a => a.uuid != uuid);
      },

      error: (err) => {
      console.error('Errore durante l\'eliminazione:', err);
    }
    })
  }

}