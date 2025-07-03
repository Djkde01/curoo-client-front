import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration-success.html',
  styleUrl: './registration-success.css',
})
export class RegistrationSuccessComponent {
  private readonly router = inject(Router);

  protected async goToDashboard(): Promise<void> {
    await this.router.navigate(['/dashboard']);
  }
}
