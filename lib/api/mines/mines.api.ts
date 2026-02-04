import { useAuthStore } from '@/store/auth.store';
import {
  StartMinesPayload,
  StartMinesResponse,
  RevealMinesResponse,
  CashoutMinesResponse,
  ActiveMinesResponse,
  MinesHistoryResponse,
} from '@/types/mines.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getAuthHeaders = (): HeadersInit => {
  const token = useAuthStore.getState().session?.accessToken;
  if (!token) throw new Error('No access token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const minesApi = {
  start: async (payload: StartMinesPayload) => {
    const res = await fetch(`${API_URL}/mines/start`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to start mines game');
    }

    return res.json() as Promise<StartMinesResponse>;
  },

  reveal: async (gameId: string, position: number) => {
    const res = await fetch(`${API_URL}/mines/reveal`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ gameId, position }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to reveal tile');
    }

    return res.json() as Promise<RevealMinesResponse>;
  },

  cashout: async (gameId: string) => {
    const res = await fetch(`${API_URL}/mines/cashout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ gameId }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to cashout');
    }

    return res.json() as Promise<CashoutMinesResponse>;
  },

  active: async () => {
    const res = await fetch(`${API_URL}/mines/active`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to get active game');
    }

    return res.json() as Promise<ActiveMinesResponse>;
  },

  history: async (limit = 10, offset = 0) => {
    const res = await fetch(`${API_URL}/mines/history?limit=${limit}&offset=${offset}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to load mines history');
    }

    return res.json() as Promise<MinesHistoryResponse>;
  },
};
