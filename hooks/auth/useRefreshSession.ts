'use client';

import { refreshTokenApi } from '@/lib/api/auth.api';
import { useAuthStore } from '@/store/auth.store';

export function useRefreshSession() {
  const session = useAuthStore((s) => s.session);
  const updateTokens = useAuthStore((s) => s.updateTokens);
  const logout = useAuthStore((s) => s.logout);

  const refreshSession = async () => {
    if (!session?.refreshToken) {
      logout();
      return;
    }

    try {
      const data = await refreshTokenApi(session.refreshToken);

      updateTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    } catch {
      logout();
    }
  };

  return { refreshSession };
}
