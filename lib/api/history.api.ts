import { useAuthStore } from '@/store/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().session?.accessToken;
  if (!token) throw new Error('No access token');

  return { Authorization: `Bearer ${token}` };
};

export async function getCrashBetsHistory(limit = 10, offset = 0) {
  const res = await fetch(`${API_URL}/crash/bets/history?limit=${limit}&offset=${offset}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message);

  return data.bets;
}
