import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  protected logout(): void {
    // Simple logout logic
    console.log('Logout clicked');
    // In a real app, you would clear auth state and redirect
  }
}
