import { useQuery } from '@tanstack/react-query';
import { plinkoApi } from '@/lib/api/plinko/plinko.api';
import type { Risk, Row } from '@/types/plinko.types';

export function usePlinkoMultipliers(risk: Risk, lines: Row) {
  return useQuery<number[]>({
    queryKey: ['plinko', 'multipliers', risk, lines],
    queryFn: () => plinkoApi.multipliers(risk, lines),
    staleTime: Infinity,
  });
}
