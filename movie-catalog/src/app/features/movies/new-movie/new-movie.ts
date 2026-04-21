import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service.js';
import { NotificationService } from '../../../core/services/notification.service.js';

@Component({
  selector: 'app-new-movie',
  imports: [FormsModule],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.css',
})
export class NewMovie {
  @ViewChild('movieForm')
  movieForm!: NgForm;

  title = '';
  imageUrl = '';
  genre = '';
  year!: number;
  description = '';

  isLoading = false;

  private router = inject(Router);
  private apiService = inject(ApiService);
  private notifService = inject(NotificationService);

  onSubmit(): void {
    if (this.movieForm.invalid) {
      return;
    }

    this.isLoading = true;

    const movieData = {
      title: this.title,
      imageUrl: this.imageUrl,
      genre: this.genre,
      year: this.year,
      description: this.description,
    };

    this.apiService.createMovie(movieData).subscribe({
      next: (movie) => {
        this.isLoading = false;

        this.notifService.showSuccess('Movie created');

        this.router.navigate(['/movies', movie._id]);
      },

      error: () => {
        this.isLoading = false;
      },
    });
  }
}
