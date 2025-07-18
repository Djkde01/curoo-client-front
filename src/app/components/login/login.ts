import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginForm: FormGroup;
  protected readonly errorMessage = signal<string>('');
  protected readonly isLoading = signal<boolean>(false);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  protected getFieldError(fieldName: string): string | null {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
      }
    }
    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      username: 'Username',
      password: 'Password',
    };
    return labels[fieldName] || fieldName;
  }

  protected async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      try {
        const { username, password } = this.loginForm.value;
        const loginRequest = { email: username, password };

        this.authService.login(loginRequest).subscribe({
          next: (success) => {
            if (success) {
              this.router.navigate(['/dashboard']);
            } else {
              this.errorMessage.set('Login failed');
            }
            this.isLoading.set(false);
          },
          error: (error) => {
            console.error('Login error:', error);
            if (error.status === 401) {
              this.errorMessage.set('Invalid username or password');
            } else if (error.status === 0) {
              this.errorMessage.set(
                'Unable to connect to server. Please check your connection.',
              );
            } else {
              this.errorMessage.set(
                'An error occurred during login. Please try again.',
              );
            }
            this.isLoading.set(false);
          },
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        this.errorMessage.set('An unexpected error occurred');
        this.isLoading.set(false);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  protected async goToRegister(): Promise<void> {
    await this.router.navigate(['/register']);
  }
}
