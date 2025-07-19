import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registrationForm;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,  
    private fb: FormBuilder,
  ) {

    this.registrationForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
    
    }

    

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const { username, email, password } = this.registrationForm.value;

    if (!username || !email || !password) {
      this.errorMessage = 'Per favore compila tutti i campi';
      return;
    }

    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Registrazione fallita!';
      }
    });
  }
  
}
