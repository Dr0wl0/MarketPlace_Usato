import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent {
  loginForm; // Dichiarazione senza inizializzazione
  
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    // Inizializzazione nel costruttore
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  const { username, email, password } = this.loginForm.value;

  if (!username || !email || !password) {
    this.errorMessage = 'Per favore compila tutti i campi';
    return;
  }

  this.authService.login(username, email, password).subscribe({
    next: (response: { uuid: string, username: string }) => {
      localStorage.setItem('userUuid', response.uuid);
      localStorage.setItem('userName', response.username || username);
      localStorage.setItem('userEmail', email);
      this.router.navigate(['/annunci']);

      this.cartService.getCarrello(localStorage.getItem('userUuid')!).subscribe({
        next: (carrello) => {
          console.log('Carrello caricato:', carrello);
        },
        error: () => {
          console.warn('Carrello non trovato – lo creo');
          this.cartService.createCarrello(localStorage.getItem('userUuid')!).subscribe({
            next: (newCarrello) => {
              console.log('Carrello creato:', newCarrello);
            },
            error: () => {
              console.error('Errore nella creazione del carrello');
              this.router.navigate(['/login']);
            }
          });  // <-- chiusura createCarrello.subscribe
        }
      });  // <-- CHIUSURA mancante per getCarrello.subscribe
    },
    error: (error) => {
      console.error('Login error:', error);
      this.errorMessage = 'Username o password errati!';
    }
  });
}


}