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

export interface RegisterData {
  firstName: string;
  surname: string;
  mobilePhone?: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly registerForm: FormGroup;
  protected readonly errorMessage = signal<string>('');
  protected readonly isLoading = signal<boolean>(false);

  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      mobilePhone: ['', [Validators.pattern(/^\+?[\d\s\-()]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  protected getFieldError(fieldName: string): string | null {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['pattern']) {
        return 'Please enter a valid phone number';
      }
    }
    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      firstName: 'First name',
      surname: 'Surname',
      mobilePhone: 'Mobile phone',
      email: 'Email address',
      password: 'Password',
    };
    return labels[fieldName] || fieldName;
  }

  protected async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      try {
        const formData = this.registerForm.value as RegisterData;
        const success = this.authService.register(formData);
        if (success) {
          await this.router.navigate(['/registration-success']);
        } else {
          this.errorMessage.set('Registration failed. Please try again.');
        }
      } catch {
        this.errorMessage.set('An error occurred during registration');
      } finally {
        this.isLoading.set(false);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
