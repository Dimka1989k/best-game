import { create } from 'zustand';
import type { LeaderboardPlayer, LeaderboardPeriod } from '@/types/leaderboard.types';
import { getLeaderboardApi } from '@/lib/api/leaderboard.api';
import type { ApiError } from '@/lib/api/api-error';

type LeaderboardState = {
  players: LeaderboardPlayer[];
  currentUser: LeaderboardPlayer | null;
  period: LeaderboardPeriod;
  isLoading: boolean;
  error: ApiError | null;

  fetchLeaderboard: (accessToken: string, period?: LeaderboardPeriod) => Promise<void>;
  setPeriod: (period: LeaderboardPeriod) => void;
};

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
  players: [],
  currentUser: null,
  period: 'all',
  isLoading: false,
  error: null,

  setPeriod: (period) => set({ period }),

  fetchLeaderboard: async (accessToken, period = 'all') => {
    set({ isLoading: true, error: null });

    try {
      const data = await getLeaderboardApi(accessToken, period);
      set({
        players: data.players,
        currentUser: data.currentUser,
        period,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error as ApiError,
        isLoading: false,
      });
    }
  },
}));
