import {
  Component,
  input,
  output,
  effect,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
  ID_TYPE_OPTIONS,
} from '../../../types/client.types';

@Component({
  selector: 'app-client-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white"
      >
        <div class="mb-4">
          <h3 class="text-lg font-bold text-gray-900">
            {{ editingClient() ? 'Edit Client' : 'Add New Client' }}
          </h3>
        </div>

        <form
          [formGroup]="clientForm"
          (ngSubmit)="handleSubmit()"
          class="space-y-4"
        >
          <!-- ID Type -->
          <div>
            <label
              for="idType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >ID Type</label
            >
            <select
              id="idType"
              formControlName="idType"
              class="w-full h-12 border border-gray-300 rounded-lg px-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              [class]="
                getFieldError('idType') ? '!border-red-500 !ring-red-500' : ''
              "
            >
              @for (option of idTypeOptions; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
            @if (getFieldError('idType')) {
              <div class="text-red-500 text-sm mt-1">
                {{ getFieldError('idType') }}
              </div>
            }
          </div>

          <!-- ID Number -->
          <div>
            <label
              for="idNumber"
              class="block text-sm font-medium text-gray-700 mb-1"
              >ID Number</label
            >
            <input
              id="idNumber"
              type="text"
              formControlName="idNumber"
              placeholder="Enter ID number"
              class="w-full h-12 border border-gray-300 rounded-lg px-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              [class]="
                getFieldError('idNumber') ? '!border-red-500 !ring-red-500' : ''
              "
            />
            @if (getFieldError('idNumber')) {
              <div class="text-red-500 text-sm mt-1">
                {{ getFieldError('idNumber') }}
              </div>
            }
          </div>

          <!-- Name -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Name</label
            >
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Enter first name"
              class="w-full h-12 border border-gray-300 rounded-lg px-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              [class]="
                getFieldError('name') ? '!border-red-500 !ring-red-500' : ''
              "
            />
            @if (getFieldError('name')) {
              <div class="text-red-500 text-sm mt-1">
                {{ getFieldError('name') }}
              </div>
            }
          </div>

          <!-- Surname -->
          <div>
            <label
              for="surname"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Surname</label
            >
            <input
              id="surname"
              type="text"
              formControlName="surname"
              placeholder="Enter surname"
              class="w-full h-12 border border-gray-300 rounded-lg px-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              [class]="
                getFieldError('surname') ? '!border-red-500 !ring-red-500' : ''
              "
            />
            @if (getFieldError('surname')) {
              <div class="text-red-500 text-sm mt-1">
                {{ getFieldError('surname') }}
              </div>
            }
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              (click)="formClose.emit()"
              class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="clientForm.invalid"
              class="w-full sm:w-auto bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {{ editingClient() ? 'Update Client' : 'Create Client' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ClientFormComponent {
  private readonly fb = inject(FormBuilder);

  editingClient = input<Client | null>(null);

  save = output<CreateClientRequest | UpdateClientRequest>();
  formClose = output<void>();

  protected readonly idTypeOptions = ID_TYPE_OPTIONS;
  protected readonly clientForm: FormGroup;

  constructor() {
    this.clientForm = this.fb.group({
      idType: ['nationalId', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
    });

    // Update form when editing client changes
    effect(() => {
      const client = this.editingClient();
      if (client) {
        this.clientForm.patchValue({
          idType: client.idType,
          idNumber: client.idNumber,
          name: client.name,
          surname: client.surname,
        });
      } else {
        this.clientForm.reset({ idType: 'nationalId' });
      }
    });
  }

  protected handleSubmit(): void {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;

      if (this.editingClient()) {
        // Update existing client
        const updateData: UpdateClientRequest = {
          id: this.editingClient()!.id,
          ...formData,
        };
        this.save.emit(updateData);
      } else {
        // Create new client
        const createData: CreateClientRequest = formData;
        this.save.emit(createData);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.clientForm.controls).forEach((key) => {
        this.clientForm.get(key)?.markAsTouched();
      });
    }
  }

  protected getFieldError(fieldName: string): string | null {
    const field = this.clientForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
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
      idType: 'ID Type',
      idNumber: 'ID Number',
      name: 'Name',
      surname: 'Surname',
    };
    return labels[fieldName] || fieldName;
  }
}
