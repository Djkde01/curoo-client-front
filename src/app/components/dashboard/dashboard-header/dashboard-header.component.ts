import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { User } from '../../../types/auth.types';

@Component({
  selector: 'app-dashboard-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div>
            <h1 class="text-xl font-bold text-gray-900">
              Welcome{{ user()?.firstName ? ', ' + user()?.firstName : '' }}!
            </h1>
            <p class="text-sm text-gray-600">Client Management System</p>
          </div>
          <button
            type="button"
            (click)="logout.emit()"
            class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  `,
})
export class DashboardHeaderComponent {
  user = input<User | null>();
  logout = output<void>();
}
