import { useAuthStore } from '@/store/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().session?.accessToken;

  if (!token) {
    throw new Error('No access token');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const crashApi = {
  bet: async (payload: { amount: number; autoCashout?: number }) => {
    const res = await fetch(`${API_URL}/crash/bet`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || 'Bet failed');
    }

    return data as {
      gameId: string;
      betId: string;
      amount: number;
    };
  },

  current: async () => {
    const res = await fetch(`${API_URL}/crash/current`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || 'Failed to load current game');
    }

    return data as {
      gameId: string;
      state: 'waiting' | 'running' | 'crashed';
      roundFinished: boolean;
      multiplier: number;
      myBet?: {
        betId: string;
        status: 'won' | 'lost';
        cashoutMultiplier?: number;
        winAmount?: number;
      };
    };
  },

  cashout: async (betId: string) => {
    const res = await fetch(`${API_URL}/crash/cashout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ betId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || 'Cashout failed');
    }

    return data as {
      multiplier: number;
      winAmount: number;
    };
  },
};
