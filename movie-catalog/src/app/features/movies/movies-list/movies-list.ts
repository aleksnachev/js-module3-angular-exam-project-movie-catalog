import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service.js';
import { Movie } from '../../../shared/interfaces/movie.js';
import { MovieItem } from "../../../shared/components/movie-item/movie-item";

@Component({
  selector: 'app-movies-list',
  imports: [MovieItem],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
})
export class MoviesList implements OnInit {
  private apiService = inject(ApiService);

  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((movies) => {
      this.movies.set(movies.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)));
    });
  }
}
