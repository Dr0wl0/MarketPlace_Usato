import { Component, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponentComponent,CommonModule],
  template: `
    <app-navbar-component *ngIf="showNavbar"></app-navbar-component>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  showNavbar = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavbar = !currentRoute.includes('/login') && 
                       !currentRoute.includes('/register') &&
                       !!localStorage.getItem('userUuid');
      console.log('Navbar visibility:', this.showNavbar); 
    });
  }
}
