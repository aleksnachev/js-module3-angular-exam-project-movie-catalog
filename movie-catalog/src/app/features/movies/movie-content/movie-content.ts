import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service.js';
import { Movie } from '../../../shared/interfaces/movie.js';
import { AuthService } from '../../../core/services/auth.service.js';

@Component({
  selector: 'app-movie-content',
  imports: [RouterLink],
  templateUrl: './movie-content.html',
  styleUrl: './movie-content.css',
})
export class MovieContent implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  movie = signal<Movie | null>(null);

  movieId = '';

  isOwner = computed(() => {
    const user = this.authService.currentUser();

    return user && this.movie() && user._id === this.movie()!.ownerId._id;
  });

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['movieId'];

    this.loadMovie();
  }

  loadMovie(): void {
    this.apiService.getMovie(this.movieId).subscribe((movie) => {
      this.movie.set(movie);
    });
  }
}
