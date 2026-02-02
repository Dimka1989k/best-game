import { useMutation } from '@tanstack/react-query';
import { casesApi } from '@/lib/api/cases/cases.api';
import { useCaseStore } from '@/store/case.store';
import { useUserStore } from '@/store/useUserStore';

export function useOpenCase(caseId: string) {
  const { setResult, setLoading, reset } = useCaseStore();
  const setBalance = useUserStore((s) => s.setBalance);

  return useMutation({
    mutationFn: () => casesApi.open(caseId),

    onMutate: () => {
      reset();
      setLoading(true);
    },

    onSuccess: (res) => {
      setResult(res);
      setBalance(res.newBalance);
    },

    onSettled: () => {
      setLoading(false);
    },
  });
}
