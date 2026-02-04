import { useAuthStore } from '@/store/auth.store';
import {
  CaseDTO,
  CaseDetailsDTO,
  OpenCaseResponse,
  CaseHistoryResponse,
} from '@/types/cases.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getAuthHeaders = (): HeadersInit => {
  const token = useAuthStore.getState().session?.accessToken;
  if (!token) throw new Error('No access token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const casesApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/cases`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error('Failed to load cases');
    return res.json() as Promise<{
      cases: CaseDTO[];
    }>;
  },

  getById: async (id: string) => {
    const res = await fetch(`${API_URL}/cases/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error('Case not found');
    return res.json() as Promise<CaseDetailsDTO>;
  },

  open: async (id: string, clientSeed?: string) => {
    const res = await fetch(`${API_URL}/cases/${id}/open`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(clientSeed ? { clientSeed } : {}),
    });

    if (!res.ok) throw new Error('Failed to open case');
    return res.json() as Promise<OpenCaseResponse>;
  },

  history: async (limit = 10, offset = 0) => {
    const res = await fetch(`${API_URL}/cases/history?limit=${limit}&offset=${offset}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error('Failed to load history');
    return res.json() as Promise<CaseHistoryResponse>;
  },
};
