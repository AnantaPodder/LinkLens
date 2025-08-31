'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getTokenRemainingTime } from '@/lib/jwt';
import { authService } from '@/lib/api';

export default function TokenExpirationWarning() {
  const { isAuthenticated, isTokenExpiring, logout } = useAuth();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isTokenExpiring) {
      setShowWarning(false);
      return;
    }

    const token = authService.getAuthToken();
    if (!token) return;

    const updateRemainingTime = () => {
      const remaining = getTokenRemainingTime(token);
      setRemainingTime(remaining);

      // Show warning when less than 5 minutes (300 seconds) remain
      if (remaining <= 300 && remaining > 0) {
        setShowWarning(true);
      } else if (remaining <= 0) {
        logout();
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isAuthenticated, isTokenExpiring, logout]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExtendSession = () => {
    // In a real app, you would refresh the token here
    // For now, just hide the warning
    setShowWarning(false);
    // TODO: Implement token refresh functionality
    console.log('Token refresh would be implemented here');
  };

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 text-yellow-100"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">
            Your session will expire in {formatTime(remainingTime)}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExtendSession}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Extend Session
          </button>
          <button
            onClick={() => setShowWarning(false)}
            className="text-yellow-100 hover:text-white transition-colors"
            aria-label="Close warning"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
