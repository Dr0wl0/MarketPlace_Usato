import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnDestroy {
  isLoggedIn = false;

  constructor(private router: Router,public authService: AuthService) {
    this.updateLoginStatus();
    // Aggiungiamo un listener per i cambiamenti di storage
    window.addEventListener('storage', this.handleStorageEvent);
  }

  ngOnDestroy(): void {
    // Rimuoviamo il listener quando il componente viene distrutto
    window.removeEventListener('storage', this.handleStorageEvent);
  }

  private handleStorageEvent = () => {
    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('userUuid');
    console.log('Login status updated:', this.isLoggedIn); // Debug
  }

  logout(): void {
    localStorage.removeItem('userUuid');
    localStorage.removeItem('userName');
    this.updateLoginStatus();
    this.router.navigate(['/login']);
  }
}