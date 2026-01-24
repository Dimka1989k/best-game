'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/useUserStore';
import { getCurrentUser } from '@/lib/api/users.api';

export function useSyncUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.session?.accessToken);

  const setUser = useUserStore((s) => s.setUser);
  const resetUser = useUserStore((s) => s.reset);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      resetUser();
      return;
    }

    getCurrentUser()
      .then((user) => {
        setUser({
          balance: user.balance,
          username: user.username,
          totalWagered: user.totalWagered,
          gamesPlayed: user.gamesPlayed,
          totalWon: user.totalWon,
        });
      })
      .catch(() => {
        resetUser();
      });
  }, [isAuthenticated, accessToken, setUser, resetUser]);
}
