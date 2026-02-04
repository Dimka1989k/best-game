import { useQuery } from '@tanstack/react-query';
import { casesApi } from '@/lib/api/cases/cases.api';

export const useCaseHistory = () =>
  useQuery({
    queryKey: ['cases-history'],
    queryFn: () => casesApi.history(10, 0),
  });
