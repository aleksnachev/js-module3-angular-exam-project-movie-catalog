import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Movie } from '../../interfaces/movie.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { ApiService } from '../../../core/services/api.service.js';
import { NotificationService } from '../../../core/services/notification.service.js';

@Component({
  selector: 'app-movie-item',
  imports: [RouterLink],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css',
})
export class MovieItem {
  @Input({ required: true }) movie!: Movie;
  @Output() movieUpdated = new EventEmitter<Movie>();

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private notifService = inject(NotificationService);

  isLiking = false;

  isLiked = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return false;
    return (this.movie.likes || []).includes(user._id);
  });

  onLikeClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const user = this.authService.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLiking = true;

    if (this.isLiked()) {
      this.apiService.unlikeMovie(this.movie._id).subscribe({
        next: (updatedMovie) => {
          Object.assign(this.movie, updatedMovie);
          this.movieUpdated.emit(updatedMovie);
          this.isLiking = false;
          this.notifService.showSuccess('Movie unliked');
        },
        error: () => {
          this.isLiking = false;
          this.notifService.showError('Failed to unlike movie');
        },
      });
    } else {
      this.apiService.likeMovie(this.movie._id).subscribe({
        next: (updatedMovie) => {
          Object.assign(this.movie, updatedMovie);
          this.movieUpdated.emit(updatedMovie);
          this.isLiking = false;
          this.notifService.showSuccess('Movie liked');
        },
        error: () => {
          this.isLiking = false;
          this.notifService.showError('Failed to like movie');
        },
      });
    }
  }
}


