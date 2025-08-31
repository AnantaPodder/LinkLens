import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseAutoLogoutOptions {
  redirectTo?: string;
  showMessage?: boolean;
}

/**
 * Hook to handle automatic logout and redirection
 */
export function useAutoLogout(options: UseAutoLogoutOptions = {}) {
  const router = useRouter();
  const { redirectTo = '/sign-in', showMessage = true } = options;

  useEffect(() => {
    const handleAutoLogout = (event: CustomEvent) => {
      const reason = event.detail?.reason;

      console.log('Auto logout detected:', reason);

      // Build redirect URL with logout reason
      let redirectUrl = redirectTo;
      if (showMessage && reason) {
        const message =
          reason === 'token_expired'
            ? 'Your session has expired. Please sign in again.'
            : 'You have been logged out.';

        redirectUrl += `?message=${encodeURIComponent(message)}`;
      }

      // Redirect to sign-in page
      router.push(redirectUrl);
    };

    window.addEventListener('auth:logout', handleAutoLogout as EventListener);

    return () => {
      window.removeEventListener(
        'auth:logout',
        handleAutoLogout as EventListener
      );
    };
  }, [router, redirectTo, showMessage]);
}

export default useAutoLogout;
