import { apiFetch } from './client';
import type { LeaderboardPeriod, LeaderboardResponse } from '@/types/leaderboard.types';

export function getLeaderboardApi(accessToken: string, period: LeaderboardPeriod = 'all') {
  return apiFetch<LeaderboardResponse>(`/leaderboard?period=${period}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
