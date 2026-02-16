import { create } from 'zustand';

interface UserState {
  balance: number;
  username?: string;
  totalWagered?: number;
  gamesPlayed?: number;
  totalWon?: number;
  avatarURL?: string;

  setUser(data: Partial<UserState>): void;
  setBalance(balance: number): void;
  changeBalance(delta: number): void;
  reset(): void;
}

export const useUserStore = create<UserState>((set) => ({
  balance: 0,

  setBalance: (balance) => set({ balance }),
  changeBalance: (delta) =>
    set((state) => ({
      balance: state.balance + delta,
    })),
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
      avatarURL: undefined,
    }),
}));
