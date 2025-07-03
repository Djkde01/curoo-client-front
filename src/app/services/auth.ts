import { Injectable } from '@angular/core';
import { User } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    // Initialization logic if needed
  }

  private users: User[] = []; // This will hold registered users

  register(user: User): boolean {
    // Simple registration logic
    this.users.push(user);
    return true; // Registration successful
  }

  login(email: string, password: string): boolean {
    // Simple login logic
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    return user !== undefined; // Return true if user is found
  }
}
