import { create } from 'zustand';
import { MinesStatus } from '@/types/mines.types';

type MinesStore = {
  gameId: string | null;
  status: MinesStatus;

  gridSize: 5 | 6 | 7 | 8;
  minesCount: number;
  totalTiles: number;

  betAmount: number;

  halfAmount: () => void;
  doubleAmount: () => void;
  maxAmount: (balance: number) => void;

  revealedPositions: number[];
  minePositions: number[] | null;
  lastHitMine: number | null;

  multiplier: number;
  currentValue: number;
  multipliers: number[];

  loading: boolean;
  error: string | null;

  setGridSize: (size: 5 | 6 | 7 | 8) => void;
  setMinesCount: (count: number) => void;
  setBetAmount: (amount: number) => void;

  startGame: (payload: {
    gameId: string;
    betAmount: number;
    gridSize: 5 | 6 | 7 | 8;
    minesCount: number;
    multipliers: number[];
  }) => void;

  revealTile: (payload: {
    isMine: boolean;
    multiplier: number;
    currentValue: number;
    revealedTiles: number[];
  }) => void;

  restoreGame: (game: {
    _id: string;
    gridSize: 5 | 6 | 7 | 8;
    minesCount: number;
    betAmount: number;
    revealedPositions: number[];
  }) => void;

  finishGame: (payload: {
    status: MinesStatus.Lost | MinesStatus.Won | MinesStatus.CashedOut;
    minePositions: number[];
    multiplier: number;
    winAmount: number;
  }) => void;

  reset: () => void;
};

export const useMinesStore = create<MinesStore>((set) => ({
  gameId: null,
  status: MinesStatus.Idle,

  gridSize: 5,
  minesCount: 3,
  totalTiles: 25,

  betAmount: 10,

  revealedPositions: [],
  minePositions: null,
  lastHitMine: null,

  multiplier: 1,
  currentValue: 0,
  multipliers: [],

  loading: false,
  error: null,

  halfAmount: () =>
    set((s) => ({
      betAmount: Math.max(0.1, s.betAmount / 2),
    })),

  doubleAmount: () =>
    set((s) => ({
      betAmount: Math.min(10000, s.betAmount * 2),
    })),

  maxAmount: (balance: number) =>
    set({
      betAmount: Math.min(balance, 10000),
    }),

  setGridSize: (size) =>
    set({
      gridSize: size,
      totalTiles: size * size,
    }),

  restoreGame: (game) =>
    set({
      gameId: game._id,
      gridSize: game.gridSize,
      minesCount: game.minesCount,
      betAmount: game.betAmount,
      revealedPositions: game.revealedPositions,
      totalTiles: game.gridSize * game.gridSize,
      status: MinesStatus.Playing,
    }),

  setMinesCount: (count) => set({ minesCount: count }),

  setBetAmount: (amount) => set({ betAmount: amount }),

  startGame: ({ gameId, betAmount, gridSize, minesCount, multipliers }) =>
    set({
      gameId,
      betAmount,
      gridSize,
      minesCount,
      multipliers,
      revealedPositions: [],
      minePositions: null,
      multiplier: 1,
      currentValue: betAmount,
      status: MinesStatus.Playing,
      lastHitMine: null,
    }),

  revealTile: ({ isMine, multiplier, currentValue, revealedTiles }) =>
    set((state) => ({
      revealedPositions: revealedTiles,
      multiplier,
      currentValue,
      lastHitMine: isMine ? revealedTiles[revealedTiles.length - 1] : null,
      status: isMine ? MinesStatus.Lost : state.status,
    })),

  finishGame: ({ status, minePositions, multiplier, winAmount }) =>
    set((state) => {
      const allPositions = Array.from({ length: state.totalTiles }, (_, i) => i);

      return {
        status,
        minePositions: minePositions ?? state.minePositions,
        revealedPositions: allPositions,
        multiplier,
        currentValue: winAmount,
      };
    }),

  reset: () =>
    set({
      gameId: null,
      status: MinesStatus.Idle,
      revealedPositions: [],
      minePositions: null,
      multiplier: 1,
      currentValue: 0,
      multipliers: [],
      error: null,
      lastHitMine: null,
    }),
}));
