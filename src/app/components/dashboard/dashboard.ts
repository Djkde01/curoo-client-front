import {
  Component,
  inject,
  computed,
  signal,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ClientService } from '../../services/client';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
} from '../../types/client.types';

// Import child components
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardActionsComponent } from './dashboard-actions/dashboard-actions.component';
import { ClientListComponent } from '../client/client-list/client-list.component';
import { ClientFormComponent } from '../client/client-form/client-form.component';
import { DeleteConfirmationModalComponent } from '../client/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardHeaderComponent,
    DashboardActionsComponent,
    ClientListComponent,
    ClientFormComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);

  protected readonly user = computed(() => this.authService.user());
  protected readonly clients = this.clientService.clientsList;
  protected readonly isLoading = signal<boolean>(true);
  protected readonly errorMessage = signal<string>('');

  // UI State
  protected readonly showCreateForm = signal<boolean>(false);
  protected readonly editingClient = signal<Client | null>(null);
  protected readonly showDeleteConfirm = signal<string | null>(null);

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.clientService.loadClients().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load clients:', error);
        this.isLoading.set(false);
        if (error.status === 401) {
          this.errorMessage.set('Authentication expired. Please log in again.');
          this.handleLogout();
        } else if (error.status === 0) {
          this.errorMessage.set(
            'Unable to connect to server. Please check your connection.',
          );
        } else {
          this.errorMessage.set('Failed to load clients. Please try again.');
        }
      },
    });
  }

  protected async handleLogout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  protected handleAddClient(): void {
    this.editingClient.set(null);
    this.showCreateForm.set(true);
  }

  protected handleEditClient(client: Client): void {
    this.editingClient.set(client);
    this.showCreateForm.set(true);
  }

  protected handleDeleteClient(clientId: string | number): void {
    this.showDeleteConfirm.set(clientId.toString());
  }

  protected handleFormClose(): void {
    this.showCreateForm.set(false);
    this.editingClient.set(null);
  }

  protected handleSaveClient(
    clientData: CreateClientRequest | UpdateClientRequest,
  ): void {
    if ('id' in clientData) {
      // Update existing client
      this.clientService
        .updateClient(clientData as UpdateClientRequest)
        .subscribe({
          next: () => {
            this.handleFormClose();
          },
          error: (error) => {
            console.error('Failed to update client:', error);
            this.errorMessage.set('Failed to update client. Please try again.');
          },
        });
    } else {
      // Create new client
      this.clientService
        .createClient(clientData as CreateClientRequest)
        .subscribe({
          next: () => {
            this.handleFormClose();
          },
          error: (error) => {
            console.error('Failed to create client:', error);
            this.errorMessage.set('Failed to create client. Please try again.');
          },
        });
    }
  }

  protected handleDeleteConfirm(): void {
    const clientId = this.showDeleteConfirm();
    if (clientId) {
      this.clientService.deleteClient(clientId).subscribe({
        next: () => {
          this.showDeleteConfirm.set(null);
        },
        error: (error) => {
          console.error('Failed to delete client:', error);
          this.errorMessage.set('Failed to delete client. Please try again.');
        },
      });
    }
  }

  protected handleDeleteCancel(): void {
    this.showDeleteConfirm.set(null);
  }
}
