import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service.js';
import { FormsModule, NgForm } from '@angular/forms';
import { InputError } from '../../shared/directives/input-error.directive.js';
import { EmailValidator } from '../../shared/directives/email-validator.directive.js';
import { NotificationService } from '../../core/services/notification.service.js';
import { ApiService } from '../../core/services/api.service.js';
import { Movie } from '../../shared/interfaces/movie.js';
import { MovieItem } from '../../shared/components/movie-item/movie-item.js';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, InputError, EmailValidator, MovieItem],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{
  @ViewChild('profileForm') profileForm!:NgForm

  private authService = inject(AuthService)
  private notifService = inject(NotificationService);
  private apiService = inject(ApiService);

  user = this.authService.currentUser

  isEditMode = signal(false)
  isLoading = signal(false)
  likedMovies = signal<Movie[]>([])

  editUsername = ''
  editEmail = ''
  editTel = ''

  ngOnInit(): void {
    if(!this.user){
      this.authService.getProfile().subscribe({
        next: (user) => {
          this.authService.setSession(user)
          this.loadLikedMovies()
        },
        error: () => {}
      })
    } else {
      this.loadLikedMovies()
    }
  }

  loadLikedMovies(): void {
    const currentUser = this.user()
    if(!currentUser) return

    this.apiService.getMovies().subscribe({
      next: (movies) => {
        const liked = movies.filter(movie => (movie.likes || []).includes(currentUser._id))
        this.likedMovies.set(liked)
      },
      error: () => {}
    })
  }

  toggleEditMode():void{
    const currentUser = this.user()
    if(currentUser){
      this.editUsername = currentUser.username
      this.editEmail = currentUser.email
      this.editTel = currentUser.tel?.replace('+359', '') || ''
    }
    this.isEditMode.set(true)
  }

  onCancel():void{
    this.isEditMode.set(false)
  }

  onSave():void{
    if(this.profileForm.invalid){
      return
    }

    this.isLoading.set(true)

    const updateData = {
      username:this.editUsername,
      email:this.editEmail,
      tel:this.editTel? '+359' + this.editTel : undefined
    }

    this.authService.updateProfile(updateData).subscribe({
      next: (user) => {
        this.authService.setSession(user)
        this.isLoading.set(false)
        this.isEditMode.set(false)
        this.notifService.showSuccess('Profile updated')
      },
      error: (err) => {
        this.isLoading.set(false)
        this.notifService.showError('Updating profile failed')
      }
    })
  }
}