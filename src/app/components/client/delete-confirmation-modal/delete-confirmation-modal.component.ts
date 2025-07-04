import { Component, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white"
      >
        <div class="text-center">
          <svg
            class="mx-auto mb-4 w-14 h-14 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete this client?
          </h3>
          <div class="flex justify-center gap-4">
            <button
              type="button"
              (click)="confirm.emit()"
              class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
            >
              Yes, delete
            </button>
            <button
              type="button"
              (click)="dismiss.emit()"
              class="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DeleteConfirmationModalComponent {
  confirm = output<void>();
  dismiss = output<void>();
}
