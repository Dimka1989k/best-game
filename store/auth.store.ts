import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  userName: string | null;
  isAuthenticated: boolean;

  login: (data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    userName: string;
  }) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      userName: null,
      isAuthenticated: false,

      login: (data) =>
        set({
          ...data,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          userName: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
