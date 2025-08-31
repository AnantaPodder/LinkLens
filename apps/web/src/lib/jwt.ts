/**
 * JWT Utility functions for token validation and expiration checking
 */

interface JWTPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Decode JWT token without verification (client-side only)
 * Note: This is for expiration checking only, not for security validation
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    // JWT has 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];

    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    // Decode from base64url to regular base64
    const base64 = paddedPayload.replace(/-/g, '+').replace(/_/g, '/');

    // Decode and parse JSON
    let decodedPayload: JWTPayload | null = null;
    try {
      decodedPayload = JSON.parse(atob(base64));
    } catch (e) {
      console.error('Error decoding base64 or parsing JWT payload:', e);
      return null;
    }

    return decodedPayload as JWTPayload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true; // Consider invalid tokens as expired
  }

  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Check if token will expire soon (within next 5 minutes)
 */
export function isTokenExpiringSoon(
  token: string,
  minutesThreshold: number = 5
): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const thresholdTime = currentTime + minutesThreshold * 60;

  return payload.exp < thresholdTime;
}

/**
 * Get token expiration time as Date object
 */
export function getTokenExpirationDate(token: string): Date | null {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return null;
  }

  return new Date(payload.exp * 1000);
}

/**
 * Get remaining time until token expires in seconds
 */
export function getTokenRemainingTime(token: string): number {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return Math.max(0, payload.exp - currentTime);
}
