import { useMutation, useQueryClient } from '@tanstack/react-query';
import { casesApi } from '@/lib/api/cases/cases.api';
import { useCaseStore } from '@/store/case.store';
import { useUserStore } from '@/store/useUserStore';

export function useOpenCase(caseId: string, casePrice: number) {
  const queryClient = useQueryClient();
  const { setResult, setLoading, reset } = useCaseStore();
  const changeBalance = useUserStore((s) => s.changeBalance);

  return useMutation({
    mutationFn: () => casesApi.open(caseId),

    onMutate: () => {
      reset();
      setLoading(true);
      changeBalance(-casePrice);
    },

    onSuccess: (res) => {
      setResult(res);
    },

    onSettled: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['cases-history'] });
    },
  });
}
