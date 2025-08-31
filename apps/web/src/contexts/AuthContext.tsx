'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { authService } from '@/lib/api';
import { isTokenExpired, isTokenExpiringSoon } from '@/lib/jwt';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isTokenExpiring: boolean;
  login: (token: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenExpiring, setIsTokenExpiring] = useState(false);

  const checkAuth = () => {
    const token = authService.getAuthToken();

    if (!token) {
      setIsAuthenticated(false);
      setIsTokenExpiring(false);
      setIsLoading(false);
      return;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      console.log('Token expired, logging out...');
      logout();
      return;
    }

    // Check if token is expiring soon (within 5 minutes)
    const expiringSoon = isTokenExpiringSoon(token, 5);
    setIsTokenExpiring(expiringSoon);

    if (expiringSoon) {
      console.warn('Token expiring soon, consider refreshing...');
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    // Listen for automatic logout events (from API 401 responses)
    const handleAutoLogout = (event: CustomEvent) => {
      console.log('Auto logout triggered:', event.detail?.reason);
      setIsAuthenticated(false);
      setIsTokenExpiring(false);
      setIsLoading(false);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:logout', handleAutoLogout as EventListener);

    // Check token expiration more frequently (every 30 seconds)
    const interval = setInterval(checkAuth, 30000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'auth:logout',
        handleAutoLogout as EventListener
      );
      clearInterval(interval);
    };
  }, []);
  const login = (token: string) => {
    authService.setAuthToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setIsTokenExpiring(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isTokenExpiring,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
