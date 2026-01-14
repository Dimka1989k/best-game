import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession } from '@/types/auth.types';

type AuthState = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  login: (session: AuthSession) => void;
  updateTokens: (tokens: Pick<AuthSession, 'accessToken' | 'refreshToken'>) => void;
  logout: () => void;
  setHasHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (session) =>
        set({
          session,
          isAuthenticated: true,
        }),

      updateTokens: ({ accessToken, refreshToken }) =>
        set((state) => {
          if (!state.session) return state;

          return {
            session: {
              ...state.session,
              accessToken,
              refreshToken,
            },
          };
        }),

      logout: () =>
        set({
          session: null,
          isAuthenticated: false,
        }),

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    },
  ),
);
