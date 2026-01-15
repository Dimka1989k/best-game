import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/lib/api/leaderboard.api';
import type { LeaderboardPeriod } from '@/types/leaderboard.types';
import { useAuthStore } from '@/store/auth.store';

export function useLeaderboardQuery(period: LeaderboardPeriod = 'all') {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: ['leaderboard', period],
    queryFn: () => getLeaderboard(period),
    enabled: hasHydrated && isAuthenticated,
    staleTime: 60_000,
  });
}
