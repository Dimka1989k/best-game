import { useQuery } from '@tanstack/react-query';
import { getCrashBetsHistory } from '@/lib/api/history.api';
import { mapCrashBetsToHistory } from '@/lib/mappers/crashHistory.mapper';

export function useGameHistory(gameType: 'crash') {
  return useQuery({
    queryKey: ['game-history', gameType],
    queryFn: async () => {
      const bets = await getCrashBetsHistory(10, 0);
      return mapCrashBetsToHistory(bets);
    },

    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
