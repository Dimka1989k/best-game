import { apiFetch } from '@/lib/api/client';
import type { LeaderboardPeriod, LeaderboardResponse } from '@/types/leaderboard.types';

export function getLeaderboard(period: LeaderboardPeriod = 'all') {
  return apiFetch<LeaderboardResponse>(`/leaderboard?period=${period}`);
}
