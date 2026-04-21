import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service.js';
import { NotificationService } from '../../../core/services/notification.service.js';
import { movieTitleValidator } from '../../../shared/validators/movie-title.validator.js';
import { movieDescriptionValidator } from '../../../shared/validators/movie-description.validator.js';
import { movieYearValidator } from '../../../shared/validators/movie-year.validator.js';
import { imageUrlValidator } from '../../../shared/validators/image-url.validator.js';

@Component({
  selector: 'app-new-movie',
  imports: [ReactiveFormsModule],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.css',
})
export class NewMovie {
  private router = inject(Router);
  private apiService = inject(ApiService);
  private notifService = inject(NotificationService);
  private fb = inject(FormBuilder);

  movieForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, movieTitleValidator()]],
    imageUrl: ['', [Validators.required, imageUrlValidator()]],
    genre: ['', [Validators.required]],
    year: ['', [Validators.required, movieYearValidator()]],
    description: ['', [Validators.required, movieDescriptionValidator()]],
  });

  isLoading = false;

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const movieData = this.movieForm.value;

    this.apiService.createMovie(movieData).subscribe({
      next: (movie) => {
        this.isLoading = false;
        this.notifService.showSuccess('Film created');
        this.router.navigate(['/movies', movie._id]);
      },
      error: () => {
        this.isLoading = false;
        this.notifService.showError('Failed to create film');
      },
    });
  }

  get title() {
    return this.movieForm.get('title');
  }

  get imageUrl() {
    return this.movieForm.get('imageUrl');
  }

  get genre() {
    return this.movieForm.get('genre');
  }

  get year() {
    return this.movieForm.get('year');
  }

  get description() {
    return this.movieForm.get('description');
  }
}
