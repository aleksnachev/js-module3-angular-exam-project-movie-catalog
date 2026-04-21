import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie.js';

@Component({
  selector: 'app-movie-item',
  imports: [RouterLink],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css',
})
export class MovieItem {
  @Input({ required: true }) movie!: Movie;
}
