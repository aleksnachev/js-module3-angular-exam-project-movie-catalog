import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { NotificationService } from '../../../core/services/notification.service.js';
import { movieTitleValidator } from '../../../shared/validators/movie-title.validator.js';
import { movieDescriptionValidator } from '../../../shared/validators/movie-description.validator.js';
import { movieYearValidator } from '../../../shared/validators/movie-year.validator.js';
import { imageUrlValidator } from '../../../shared/validators/image-url.validator.js';

@Component({
  selector: 'app-edit-movie',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-movie.html',
  styleUrl: './edit-movie.css',
})
export class EditMovie implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private notifService = inject(NotificationService);
  private fb = inject(FormBuilder);

  movieForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, movieTitleValidator()]],
    imageUrl: ['', [Validators.required, imageUrlValidator()]],
    genre: ['', [Validators.required]],
    year: ['', [Validators.required, movieYearValidator()]],
    description: ['', [Validators.required, movieDescriptionValidator()]],
  });

  movieId = '';
  isLoading = false;
  isLoadingData = true;
  isOwner = false;

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['movieId'];
    this.loadMovie();
  }

  loadMovie(): void {
    this.apiService.getMovie(this.movieId).subscribe({
      next: (movie) => {
        const user = this.authService.currentUser();
        this.isOwner = user?._id === movie.ownerId._id;

        if (!this.isOwner) {
          this.notifService.showError('You are not allowed to edit this movie');
          this.router.navigate(['/movies', this.movieId]);
          return;
        }

        this.movieForm.patchValue({
          title: movie.title,
          imageUrl: movie.imageUrl,
          genre: movie.genre,
          year: movie.year,
          description: movie.description,
        });

        this.isLoadingData = false;
      },
      error: () => {
        this.isLoadingData = false;
        this.notifService.showError('Failed to load movie');
        this.router.navigate(['/movies']);
      },
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const movieData = this.movieForm.value;

    this.apiService.editMovie(this.movieId, movieData).subscribe({
      next: (movie) => {
        this.isLoading = false;
        this.notifService.showSuccess('Movie updated');
        this.router.navigate(['/movies', movie._id]);
      },
      error: () => {
        this.isLoading = false;
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
