import { useQuery } from '@tanstack/react-query';
import { casesApi } from '@/lib/api/cases/cases.api';

export const useCases = () =>
  useQuery({
    queryKey: ['cases'],
    queryFn: casesApi.getAll,
  });
