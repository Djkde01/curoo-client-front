import { Component, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Clients</h2>
        <p class="text-gray-600">Manage your client database</p>
      </div>
      <button
        type="button"
        (click)="addClient.emit()"
        class="w-full sm:w-auto bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add New Client
      </button>
    </div>
  `,
})
export class DashboardActionsComponent {
  addClient = output<void>();
}
