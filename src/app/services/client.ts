import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
} from '../types/client.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private clients = signal<Client[]>([]);

  // Getter for clients list
  get clientsList() {
    return this.clients.asReadonly();
  }

  loadClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiUrl}/clients/all`).pipe(
      map((clients) => {
        const mappedClients = clients.map((client) => ({
          ...client,
          firstName: client.name, // Map for backward compatibility
          lastName: client.surname, // Map for backward compatibility
          createdAt: client.createdAt ? new Date(client.createdAt) : new Date(),
          updatedAt: client.updatedAt ? new Date(client.updatedAt) : new Date(),
        }));
        this.clients.set(mappedClients);
        return mappedClients;
      }),
      catchError((error) => {
        console.error('Failed to load clients:', error);
        return throwError(() => error);
      }),
    );
  }

  createClient(clientData: CreateClientRequest): Observable<Client> {
    return this.http
      .post<Client>(`${environment.apiUrl}/clients/save`, clientData)
      .pipe(
        map((newClient) => {
          const mappedClient: Client = {
            ...newClient,
            firstName: newClient.name,
            lastName: newClient.surname,
            createdAt: newClient.createdAt
              ? new Date(newClient.createdAt)
              : new Date(),
            updatedAt: newClient.updatedAt
              ? new Date(newClient.updatedAt)
              : new Date(),
          };

          this.clients.update((clients) => [...clients, mappedClient]);
          return mappedClient;
        }),
        catchError((error) => {
          console.error('Failed to create client:', error);
          return throwError(() => error);
        }),
      );
  }

  updateClient(clientData: UpdateClientRequest): Observable<Client> {
    return this.http
      .put<Client>(`${environment.apiUrl}/clients/${clientData.id}`, clientData)
      .pipe(
        map((updatedClient) => {
          const mappedClient: Client = {
            ...updatedClient,
            firstName: updatedClient.name,
            lastName: updatedClient.surname,
            createdAt: updatedClient.createdAt
              ? new Date(updatedClient.createdAt)
              : new Date(),
            updatedAt: updatedClient.updatedAt
              ? new Date(updatedClient.updatedAt)
              : new Date(),
          };

          this.clients.update((clients) =>
            clients.map((client) =>
              client.id === clientData.id ? mappedClient : client,
            ),
          );

          return mappedClient;
        }),
        catchError((error) => {
          console.error('Failed to update client:', error);
          return throwError(() => error);
        }),
      );
  }

  deleteClient(clientId: string | number): Observable<boolean> {
    return this.http
      .delete<void>(`${environment.apiUrl}/clients/${clientId}`)
      .pipe(
        map(() => {
          this.clients.update((clients) =>
            clients.filter((client) => client.id !== clientId),
          );
          return true;
        }),
        catchError((error) => {
          console.error('Failed to delete client:', error);
          return throwError(() => error);
        }),
      );
  }

  getClientById(clientId: string | number): Client | null {
    return this.clients().find((client) => client.id === clientId) || null;
  }

  getClientByIdAndType(idType: string, idNumber: string): Observable<Client> {
    return this.http
      .get<Client>(`${environment.apiUrl}/clients/${idType}/${idNumber}`)
      .pipe(
        map((client) => ({
          ...client,
          firstName: client.name,
          lastName: client.surname,
          createdAt: client.createdAt ? new Date(client.createdAt) : new Date(),
          updatedAt: client.updatedAt ? new Date(client.updatedAt) : new Date(),
        })),
        catchError((error) => {
          console.error('Failed to get client by ID and type:', error);
          return throwError(() => error);
        }),
      );
  }
}
