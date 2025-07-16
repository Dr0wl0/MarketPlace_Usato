import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Reindirizza al login dopo la registrazione
      },
      error: () => {
        this.errorMessage = 'Registrazione fallita!'; // TODO  - PRENDERE INFORMAZIONI DALLA RESPONSE
      }
    });
  }
  
}
