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

export class MinesService {
  private getAuthHeaders(): HeadersInit {
    const token = useAuthStore.getState().session?.accessToken;
    if (!token) {
      throw new Error('No access token');
    }

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async start(payload: StartMinesPayload): Promise<StartMinesResponse> {
    return this.request('/mines/start', payload);
  }

  async reveal(gameId: string, position: number): Promise<RevealMinesResponse> {
    return this.request('/mines/reveal', { gameId, position });
  }

  async cashout(gameId: string): Promise<CashoutMinesResponse> {
    return this.request('/mines/cashout', { gameId });
  }

  async active(): Promise<ActiveMinesResponse> {
    return this.request('/mines/active', undefined, 'GET');
  }

  async history(limit = 10, offset = 0): Promise<MinesHistoryResponse> {
    return this.request(`/mines/history?limit=${limit}&offset=${offset}`, undefined, 'GET');
  }

  private async request<T>(
    path: string,
    body?: unknown,
    method: 'POST' | 'GET' = 'POST',
  ): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: this.getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Mines API error');
    }

    return res.json() as Promise<T>;
  }
}

export const minesApi = new MinesService();
