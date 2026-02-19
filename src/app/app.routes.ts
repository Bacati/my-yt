import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './pages/home/home';
import { Profil } from './pages/profil/profil';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: Profil, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];