import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';
import { OpenedCaseItem } from '@/types/cases.types';

export function useSellCaseItem() {
  const changeBalance = useUserStore((s) => s.changeBalance);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: OpenedCaseItem) => item,

    onSuccess: (item) => {
      changeBalance(item.value);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['cases-history'] });
    },
  });
}
