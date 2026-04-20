import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMovieData, Movie } from '../../shared/interfaces/movie.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${movieId}`);
  }

  createMovie(data: CreateMovieData): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, data, { withCredentials: true });
  }

  subscribeToMovie(movieId: string): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies/${movieId}`, {}, { withCredentials: true });
  }
}
