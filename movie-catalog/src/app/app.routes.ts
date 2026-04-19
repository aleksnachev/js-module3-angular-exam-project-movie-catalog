import { Routes } from '@angular/router';
import { Home } from './features/home/home/home.js';
import { Login } from './features/auth/login/login.js';
import { Register } from './features/auth/register/register.js';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
