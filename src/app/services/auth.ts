import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  User,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
} from '../types/auth.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal<boolean>(false);
  private token = signal<string | null>(null);

  constructor() {
    // Check for existing auth state in localStorage
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');

    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.token.set(savedToken);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch {
        // Clear invalid data
        this.clearAuthData();
      }
    }
  }

  // Getter for authentication state
  get isLoggedIn() {
    return this.isAuthenticated.asReadonly();
  }

  // Getter for current user
  get user() {
    return this.currentUser.asReadonly();
  }

  // Getter for auth token
  get authToken() {
    return this.token.asReadonly();
  }

  register(userData: RegisterRequest): Observable<boolean> {
    return this.http
      .post<void>(`${environment.apiUrl}/users/register`, userData)
      .pipe(
        map(() => {
          // Registration successful - auto-login might happen here
          // Based on the API, registration might not return a token
          return true;
        }),
        catchError((error) => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        }),
      );
  }

  login(credentials: LoginRequest): Observable<boolean> {
    // Based on the updated Postman collection, login uses application/x-www-form-urlencoded
    const body = new URLSearchParams();
    body.set('email', credentials.email);
    body.set('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/users/login`, body, {
        headers,
      })
      .pipe(
        map((data) => {
          if (data.token) {
            // Extract user info from token or make a separate call
            // For now, create a basic user object
            const user: User = {
              email: credentials.email,
              name: '', // Will be populated after getting user details
              surname: '', // Will be populated after getting user details
            };

            this.token.set(data.token);
            this.currentUser.set(user);
            this.isAuthenticated.set(true);

            // Save to localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(user));

            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        }),
      );
  }

  updateUser(userId: number, userData: UpdateUserRequest): Observable<User> {
    return this.http
      .put<User>(`${environment.apiUrl}/users/${userId}`, userData)
      .pipe(
        map((updatedUser) => {
          // Update current user if it's the same user
          if (this.currentUser()?.id === userId) {
            this.currentUser.set(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          }
          return updatedUser;
        }),
        catchError((error) => {
          console.error('Update user failed:', error);
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    this.clearAuthData();
  }

  private clearAuthData(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.token.set(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }
}
