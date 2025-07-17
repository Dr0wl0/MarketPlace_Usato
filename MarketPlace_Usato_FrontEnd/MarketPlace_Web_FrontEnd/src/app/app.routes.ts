import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component.component';
import { RegisterComponent } from './components/register/register.component';
import { MostraListaComponent } from './components/mostra-lista/mostra-lista.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { authGuard } from './auth.guard';
import { CambiaCredenzialiComponent } from './components/cambia-credenziali/cambia-credenziali.component';
import { AnnunciPreferitiComponent } from './components/annunci-preferiti/annunci-preferiti.component';
import { AnnunciPropriComponent } from './components/annunci-propri/annunci-propri.component';
import { CarrelloComponent } from './components/carrello/carrello.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent,data: { hideNavbar: true }  },
  { path: 'register', component: RegisterComponent,data: { hideNavbar: true }  },
  { path: 'annunci', component: MostraListaComponent},
  { path: 'annunci-propi', component: AnnunciPropriComponent},
  { path: 'preferiti', component: AnnunciPreferitiComponent},
  { path: 'carrello', component: CarrelloComponent},
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