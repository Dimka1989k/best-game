import { create } from 'zustand';

export type CrashState = 'waiting' | 'running' | 'crashed';

interface CrashStore {
  gameId?: string;
  betId?: string;
  state: CrashState;
  multiplier: number;
  crashPoint?: number;
  amount: number;
  status?: 'won' | 'lost';
  winAmount?: number;
  setAmount(v: number): void;
  resetRound(): void;
  roundFinished: boolean;
  markRoundFinished(): void;
  resetRoundFinished(): void;
  halfAmount(): void;
  doubleAmount(): void;
  maxAmount(balance: number): void;
  placeBet(gameId: string, betId: string, amount: number, autoCashout?: number): void;
  setMultiplier(m: number): void;
  cashout(multiplier: number, winAmount: number): void;
  crash(crashPoint: number): void;
  autoCashout?: number;
  reset(): void;
}

export const useCrashStore = create<CrashStore>((set, get) => ({
  state: 'waiting',
  multiplier: 1,
  amount: 0,
  setAmount: (v) => set({ amount: v }),
  halfAmount: () => set({ amount: Math.max(0.1, get().amount / 2) }),
  doubleAmount: () => set({ amount: Math.min(10000, get().amount * 2) }),
  maxAmount: (balance) => set({ amount: Math.min(balance, 10000) }),
  placeBet: (gameId, betId, amount, autoCashout) =>
    set({
      gameId,
      betId,
      amount,
      autoCashout,
      state: 'running',
      multiplier: 1,
      status: undefined,
      winAmount: undefined,
      crashPoint: undefined,
      roundFinished: false,
    }),

  setMultiplier: (m) => set({ multiplier: m }),

  cashout: (multiplier, winAmount) =>
    set({
      state: 'crashed',
      status: 'won',
      multiplier,
      winAmount,
    }),

  crash: (crashPoint) =>
    set((s) => {
      if (s.status === 'won') return s;
      return {
        state: 'crashed',
        status: 'lost',
        crashPoint,
      };
    }),

  resetRound: () =>
    set((s) => ({
      state: 'waiting',
      multiplier: 1,
      betId: undefined,
      status: undefined,
      winAmount: undefined,
      crashPoint: undefined,
      roundFinished: false,

      amount: s.amount,
    })),

  roundFinished: false,

  markRoundFinished: () => set({ roundFinished: true }),
  resetRoundFinished: () => set({ roundFinished: false }),

  reset: () =>
    set({
      state: 'waiting',
      multiplier: 1,
      amount: 0,
      betId: undefined,
      status: undefined,
      winAmount: undefined,
      crashPoint: undefined,
      roundFinished: false,
    }),
}));
