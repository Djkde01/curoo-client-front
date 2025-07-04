import {
  Component,
  inject,
  computed,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ClientService } from '../../services/client.service';
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
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);

  protected readonly user = computed(() => this.authService.user());
  protected readonly clients = this.clientService.clientsList;

  // UI State
  protected readonly showCreateForm = signal<boolean>(false);
  protected readonly editingClient = signal<Client | null>(null);
  protected readonly showDeleteConfirm = signal<string | null>(null);

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

  protected handleDeleteClient(clientId: string): void {
    this.showDeleteConfirm.set(clientId);
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
      this.clientService.updateClient(clientData as UpdateClientRequest);
    } else {
      // Create new client
      this.clientService.createClient(clientData as CreateClientRequest);
    }
    this.handleFormClose();
  }

  protected handleDeleteConfirm(): void {
    const clientId = this.showDeleteConfirm();
    if (clientId) {
      this.clientService.deleteClient(clientId);
      this.showDeleteConfirm.set(null);
    }
  }

  protected handleDeleteCancel(): void {
    this.showDeleteConfirm.set(null);
  }
}
