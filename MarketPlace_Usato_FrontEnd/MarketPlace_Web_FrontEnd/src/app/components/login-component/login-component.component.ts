import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Username o password errati!';
      }
    });
  }
}