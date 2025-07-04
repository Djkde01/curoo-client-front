import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Client } from '../../../types/client.types';

@Component({
  selector: 'app-client-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, TitleCasePipe],
  template: `
    @if (clients().length === 0) {
      <div class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No clients</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating a new client.
        </p>
      </div>
    } @else {
      <!-- Mobile Cards View -->
      <div class="block sm:hidden space-y-4">
        @for (client of clients(); track client.id) {
          <div class="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-semibold text-gray-900">
                  {{ client.name }} {{ client.surname }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ client.idType | titlecase }}: {{ client.idNumber }}
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  type="button"
                  (click)="editClient.emit(client)"
                  class="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  (click)="deleteClient.emit(client.id)"
                  class="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="text-xs text-gray-500">
              Created: {{ client.createdAt | date: 'short' }}
            </div>
          </div>
        }
      </div>

      <!-- Desktop Table View -->
      <div
        class="hidden sm:block overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (client of clients(); track client.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ client.name }} {{ client.surname }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                  >
                    {{ client.idType | titlecase }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ client.idNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ client.createdAt | date: 'short' }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex justify-end gap-2">
                    <button
                      type="button"
                      (click)="editClient.emit(client)"
                      class="text-primary-600 hover:text-primary-900 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      (click)="deleteClient.emit(client.id)"
                      class="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
})
export class ClientListComponent {
  clients = input.required<Client[]>();
  editClient = output<Client>();
  deleteClient = output<string>();
}
