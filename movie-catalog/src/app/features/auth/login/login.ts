import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputError } from '../../../shared/directives/input-error.directive.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { NotificationService } from '../../../core/services/notification.service.js';
import { EmailValidator } from '../../../shared/directives/email-validator.directive.js';
import { emailValidator } from '../../../shared/validators/email.validator.js';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, FormsModule, InputError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private notifService = inject(NotificationService);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  isLoading = false;
  hasError = false;

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.hasError = false;
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.authService.setSession(user);
        this.isLoading = false;
        this.notifService.showSuccess('Login successful');
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.notifService.showError(err.error?.message || 'Login failed. Please try again.');
      },
    });
  }
}
