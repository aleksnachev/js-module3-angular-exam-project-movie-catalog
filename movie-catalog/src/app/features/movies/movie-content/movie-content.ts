import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service.js';
import { Movie } from '../../../shared/interfaces/movie.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { NotificationService } from '../../../core/services/notification.service.js';

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
  private router = inject(Router);
  private notifService = inject(NotificationService);

  movie = signal<Movie | null>(null);

  movieId = '';
  isDeleting = false;

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

  onDelete(): void {
    if (!confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    this.isDeleting = true;

    this.apiService.deleteMovie(this.movieId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.notifService.showSuccess('Movie deleted');
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.isDeleting = false;
        this.notifService.showError('Failed to delete movie');
      },
    });
  }
}

