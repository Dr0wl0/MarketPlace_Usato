import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent implements OnInit {
  isNotLoggedIn = true;
  private router: Router = new Router;

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', () => this.checkLoginStatus()); 
  }

  checkLoginStatus(): void {
    this.isNotLoggedIn = !!localStorage.getItem('userUuid');
  }

  logout(): void {
    localStorage.removeItem('userUuid');
    localStorage.removeItem('userName')
    this.checkLoginStatus();
    this.router.navigate(['/login'])
  }
}