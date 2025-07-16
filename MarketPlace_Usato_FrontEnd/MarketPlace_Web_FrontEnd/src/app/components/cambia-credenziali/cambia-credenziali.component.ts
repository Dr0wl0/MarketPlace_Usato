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
    const { newUsername, newPassword, confirmPassword } = this.credentialsForm.value;

    if (newPassword && newPassword !== confirmPassword) {
      alert('Le password non coincidono!');
      return;
    }

    // Aggiorna credenziali 
    if (newUsername && newPassword) {
      this.authService.updateUser(newUsername,newPassword).subscribe({
        next: () => alert('Credenziali aggiornate con successo!!'),
        error: (err) => alert('Errore durante l\'aggiornamento delle credenziali: ' + err.message)
      });
    }
    
    this.router.navigate(['/profilo']);
    }
  }
}