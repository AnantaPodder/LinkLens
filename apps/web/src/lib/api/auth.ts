import { apiClient } from './client';
import {
  ApiResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './types';

export class AuthService {
  /**
   * Register a new user
   */
  async register(
    userData: RegisterRequest
  ): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<ApiResponse<RegisterResponse>>(
      '/auth/register',
      userData
    );
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    );

    // Store the auth token
    if (response.accessToken) {
      apiClient.setAuthToken(response.accessToken);
    }

    return {
      success: true,
      data: response,
      message: 'Login successful',
    };
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    apiClient.removeAuthToken();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  /**
   * Get current auth token
   */
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  /**
   * Set auth token
   */
  setAuthToken(token: string): void {
    apiClient.setAuthToken(token);
  }
}

// Export singleton instance
export const authService = new AuthService();
