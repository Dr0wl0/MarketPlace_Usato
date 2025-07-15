import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component.component';
import { RegisterComponent } from './components/register/register.component';
import { MostraListaComponent } from './components/mostra-lista/mostra-lista.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'annunci', component: MostraListaComponent},
 // { path: 'favoriti'},
 // { path: 'annunci-propri'},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];