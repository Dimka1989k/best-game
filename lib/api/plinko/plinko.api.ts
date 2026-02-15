import { apiFetch } from '@/lib/api/client';
import type {
  PlinkoDropResponse,
  PlinkoMultipliersResponse,
  PlinkoHistoryResponse,
  Risk,
  Row,
  DropPayload,
} from '../../../types/plinko.types';

export const plinkoApi = {
  drop: (payload: DropPayload) =>
    apiFetch<PlinkoDropResponse>('/plinko/drop', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  history: () => apiFetch<PlinkoHistoryResponse>('/plinko/history'),

  multipliers: (risk: Risk, lines: Row) =>
    apiFetch<PlinkoMultipliersResponse>(`/plinko/multipliers?risk=${risk}&lines=${lines}`).then(
      (res) => res.multipliers,
    ),
};
