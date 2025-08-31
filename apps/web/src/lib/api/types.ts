// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
}

// Auth Types
export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
