import { Routes } from '@angular/router';
import { Home } from './features/home/home/home.js';
import { Login } from './features/auth/login/login.js';
import { Register } from './features/auth/register/register.js';
import { NotFound } from './features/not-found/not-found.js';
import { Movies } from './features/movies/movies.js';
import { MovieContent } from './features/movies/movie-content/movie-content.js';
import { NewMovie } from './features/movies/new-movie/new-movie.js';
import { EditMovie } from './features/movies/edit-movie/edit-movie.js';
import { Profile } from './features/profile/profile.js';
import { authGuard } from './core/guards/auth.guard.js';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'movies', component: Movies },
  { path: 'movies/:movieId', component: MovieContent },
  { path: 'add-movie', component: NewMovie, canActivate: [authGuard] },
  { path: 'movies/edit/:movieId', component: EditMovie, canActivate: [authGuard] },

  { path: 'profile', component: Profile, canActivate: [authGuard] },


  { path: '**', component: NotFound },
];
