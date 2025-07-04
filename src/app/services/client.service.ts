import { Injectable, signal } from '@angular/core';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
} from '../types/client.types';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients = signal<Client[]>([]);
  private nextId = 1;

  constructor() {
    // Load initial mock data
    this.loadMockData();
  }

  // Getter for clients list
  get clientsList() {
    return this.clients.asReadonly();
  }

  private loadMockData(): void {
    const mockClients: Client[] = [
      {
        id: '1',
        idType: 'nationalId',
        idNumber: '1234567890123',
        name: 'John',
        surname: 'Doe',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        idType: 'passport',
        idNumber: 'AB123456',
        name: 'Jane',
        surname: 'Smith',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10'),
      },
    ];
    this.clients.set(mockClients);
    this.nextId = 3;
  }

  createClient(clientData: CreateClientRequest): Client {
    const newClient: Client = {
      id: this.nextId.toString(),
      ...clientData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.clients.update((clients) => [...clients, newClient]);
    this.nextId++;
    return newClient;
  }

  updateClient(clientData: UpdateClientRequest): Client | null {
    const clientIndex = this.clients().findIndex((c) => c.id === clientData.id);
    if (clientIndex === -1) {
      return null;
    }

    const updatedClient: Client = {
      ...this.clients()[clientIndex],
      ...clientData,
      updatedAt: new Date(),
    };

    this.clients.update((clients) =>
      clients.map((client) =>
        client.id === clientData.id ? updatedClient : client,
      ),
    );

    return updatedClient;
  }

  deleteClient(clientId: string): boolean {
    const initialLength = this.clients().length;
    this.clients.update((clients) =>
      clients.filter((client) => client.id !== clientId),
    );
    return this.clients().length < initialLength;
  }

  getClientById(clientId: string): Client | null {
    return this.clients().find((client) => client.id === clientId) || null;
  }
}
