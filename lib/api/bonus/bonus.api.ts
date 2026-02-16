import { useAuthStore } from '@/store/auth.store';
import { BonusClaimResponse, BonusStatusResponse } from '@/types/bous.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export class BonusService {
  private getAuthHeaders(): HeadersInit {
    const token = useAuthStore.getState().session?.accessToken;
    if (!token) throw new Error('No access token');

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async status(): Promise<BonusStatusResponse> {
    const res = await fetch(`${API_URL}/bonus/status`, {
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) throw new Error('Failed to load bonus status');

    return res.json();
  }

  async claim(): Promise<BonusClaimResponse> {
    const res = await fetch(`${API_URL}/bonus/claim`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to claim bonus');
    }

    return res.json();
  }
}

export const bonusApi = new BonusService();
