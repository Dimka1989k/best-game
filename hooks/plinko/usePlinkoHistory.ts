import { useQuery } from '@tanstack/react-query';
import { plinkoApi } from '@/lib/api/plinko/plinko.api';
import { mapPlinkoHistory } from '@/lib/mappers/plinko.mapper';
import type { PlinkoHistoryRow } from '@/types/plinko.types';

export function usePlinkoHistory() {
  return useQuery<PlinkoHistoryRow[]>({
    queryKey: ['plinko', 'history'],
    queryFn: async () => {
      const res = await plinkoApi.history();
      return res.drops.map(mapPlinkoHistory);
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
