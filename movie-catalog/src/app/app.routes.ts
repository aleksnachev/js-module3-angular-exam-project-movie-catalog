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
  { path: 'home', loadComponent: () => import('./features/home/home/home.js').then((c) => c.Home) },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.js').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.js').then((c) => c.Register),
  },

  {
    path: 'movies',
    loadComponent: () => import('./features/movies/movies.js').then((c) => c.Movies),
  },
  // { path: 'movies', component: Movies },
  {
    path: 'movies/:movieId',
    loadComponent: () =>
      import('./features/movies/movie-content/movie-content.js').then((c) => c.MovieContent),
  },
  // { path: 'movies/:movieId', component: MovieContent },
  {
    path: 'add-movie',
    loadComponent: () => import('./features/movies/new-movie/new-movie.js').then((c) => c.NewMovie),
    canActivate: [authGuard],
  },
  // { path: 'add-movie', component: NewMovie, canActivate: [authGuard] },
  // { path: 'movies/edit/:movieId', component: EditMovie, canActivate: [authGuard] },
  {
    path: 'movies/edit/:movieId',
    loadComponent: () =>
      import('./features/movies/edit-movie/edit-movie.js').then((c) => c.EditMovie),
    canActivate: [authGuard],
  },

  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.js').then((c) => c.Profile),
    canActivate: [authGuard],
  },

  // { path: 'profile', component: Profile, canActivate: [authGuard] },

  // { path: '**', component: NotFound },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.js').then((c) => c.NotFound),
  },
];
