export interface User {
  id?: number;
  name: string;
  surname: string;
  firstName?: string; // Keep for backward compatibility
  lastName?: string; // Keep for backward compatibility
  mobilePhone?: string;
  email: string;
  password?: string; // Optional for security
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  surname: string;
  mobilePhone?: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  surname?: string;
  mobilePhone?: string;
}

export interface AuthResponse {
  token?: string;
  user?: User;
}

export interface LoginResponse {
  token: string;
  user: User;
}
