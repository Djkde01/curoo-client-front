import { Injectable, signal } from '@angular/core';
import { User } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = []; // This will hold registered users
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal<boolean>(false);

  constructor() {
    // Check for existing auth state in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
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

  register(user: User): boolean {
    // Simple registration logic
    this.users.push(user);

    // Auto-login after registration
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', JSON.stringify(user));

    return true; // Registration successful
  }

  login(email: string, password: string): boolean {
    // Simple login logic
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
  }
}
