import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambia-credenziali',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cambia-credenziali.component.html',
  styleUrls: ['./cambia-credenziali.component.css']
})
export class CambiaCredenzialiComponent {
  credentialsForm: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.credentialsForm = this.fb.group({
      newUsername: ['', [Validators.required, Validators.minLength(3)]],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  onSubmit(): void {
    if (this.credentialsForm.valid) {
      // Qui implementerai la chiamata API per cambiare le credenziali
      const newUsername = this.credentialsForm.value.newUsername;
      if (newUsername) {
        this.authService.updateUserName(newUsername);
      }
      
      this.router.navigate(['/profilo']);
    }
  }
}