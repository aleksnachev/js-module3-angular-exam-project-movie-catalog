import { Component } from '@angular/core';
import { MoviesList } from './movies-list/movies-list.js';

@Component({
  selector: 'app-movies',
  imports: [MoviesList],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}
