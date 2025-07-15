import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component.component';
import { RegisterComponent } from './components/register/register.component';
import { MostraListaComponent } from './components/mostra-lista/mostra-lista.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { authGuard } from './auth.guard';
import { CambiaCredenzialiComponent } from './components/cambia-credenziali/cambia-credenziali.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent,data: { hideNavbar: true }  },
  { path: 'register', component: RegisterComponent,data: { hideNavbar: true }  },
  { path: 'annunci', component: MostraListaComponent},
 // { path: 'favoriti'},
 // { path: 'annunci-propri'},
 { 
    path: 'profilo', 
    component: ProfiloComponent,
    canActivate: [authGuard] 
  },
  { 
    path: 'cambia-credenziali', 
    component: CambiaCredenzialiComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];