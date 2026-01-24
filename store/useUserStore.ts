import { create } from 'zustand';

interface UserState {
  balance: number;
  username?: string;
  totalWagered?: number;
  gamesPlayed?: number;
  totalWon?: number;

  setUser: (data: Partial<UserState>) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  balance: 0,

  setUser: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  reset: () =>
    set({
      balance: 0,
      username: undefined,
      totalWagered: undefined,
      gamesPlayed: undefined,
      totalWon: undefined,
    }),
}));
