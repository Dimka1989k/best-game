import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bonusApi } from '@/lib/api/bonus/bonus.api';
import { useUserStore } from '@/store/useUserStore';

export const useBonusStatus = () =>
  useQuery({
    queryKey: ['bonus', 'status'],
    queryFn: () => bonusApi.status(),
  });

export const useClaimBonus = () => {
  const queryClient = useQueryClient();
  const setBalance = useUserStore((s) => s.setBalance);

  return useMutation({
    mutationFn: () => bonusApi.claim(),

    onSuccess: (res) => {
      setBalance(res.balance);

      queryClient.invalidateQueries({ queryKey: ['bonus', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
};
