import { create } from 'zustand';
import { Risk, Row, PlinkoDrop } from '@/types/plinko.types';

type PlinkoState = {
  rows: Row;
  risk: Risk;

  betAmount: number;
  balls: number;
  roundId: number;

  lastWin: number;
  lastMultiplier: number;
  finishGame: (result: { totalWin: number; multiplier: number }) => void;
  isAnimating: boolean;
  setAnimating: (v: boolean) => void;

  isPlaying: boolean;
  drops: PlinkoDrop[] | null;
  halfAmount: () => void;
  doubleAmount: () => void;
  maxAmount: (balance: number) => void;

  changeRows: (rows: Row) => void;
  changeRisk: (risk: Risk) => void;
  changeBetAmount: (amount: number) => void;
  changeBalls: (balls: number) => void;

  startGame: () => void;
  setDrops: (drops: PlinkoDrop[]) => void;
  resetGame: () => void;
};

export const usePlinkoStore = create<PlinkoState>((set) => ({
  rows: 8,
  risk: Risk.Low,

  betAmount: 10,
  balls: 5,

  isPlaying: false,
  drops: null,
  roundId: 0,

  lastWin: 0,
  lastMultiplier: 1,
  isAnimating: false,

  setAnimating: (v) => set({ isAnimating: v }),

  finishGame: ({ totalWin, multiplier }) =>
    set({
      isPlaying: false,
      lastWin: totalWin,
      lastMultiplier: multiplier,
    }),

  halfAmount: () => set((s) => ({ betAmount: Math.max(0.1, s.betAmount / 2) })),

  doubleAmount: () => set((s) => ({ betAmount: Math.min(10000, s.betAmount * 2) })),

  maxAmount: (max: number) => set({ betAmount: max }),

  changeRows: (rows) =>
    set({
      rows,
      drops: null,
      isPlaying: false,
    }),

  changeRisk: (risk) =>
    set({
      risk,
      drops: null,
      isPlaying: false,
    }),

  resetGame: () =>
    set({
      isPlaying: false,
      drops: null,
      lastWin: 0,
      lastMultiplier: 1,
    }),

  changeBetAmount: (betAmount) => set({ betAmount }),

  changeBalls: (balls) => set({ balls }),

  startGame: () =>
    set((s) => ({
      isPlaying: true,
      drops: null,
      roundId: s.roundId + 1,
    })),

  setDrops: (drops) =>
    set({
      drops,
      isPlaying: false,
    }),
}));
