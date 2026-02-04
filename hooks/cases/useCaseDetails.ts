import { useQuery } from '@tanstack/react-query';
import { casesApi } from '@/lib/api/cases/cases.api';

export const useCaseDetails = (id: string) =>
  useQuery({
    queryKey: ['case', id],
    queryFn: () => casesApi.getById(id),
    enabled: !!id,
  });
