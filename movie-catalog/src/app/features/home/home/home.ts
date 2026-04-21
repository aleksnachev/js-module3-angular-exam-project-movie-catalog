import { Component, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service.js';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private authService = inject(AuthService)
  isLoggedIn = this.authService.isLoggedIn
}
