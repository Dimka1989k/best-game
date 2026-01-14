import { useAuthStore } from '@/store/auth.store';
import { refreshTokenApi } from '@/lib/api/auth.api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const { session, updateTokens, logout } = useAuthStore.getState();

  const makeRequest = (accessToken?: string) =>
    fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options.headers || {}),
      },
    });

  let res = await makeRequest(session?.accessToken);

  if (res.status !== 401) {
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw {
        status: res.status,
        message: error.message || 'Request failed',
      };
    }

    return res.json();
  }

  if (!session?.refreshToken) {
    logout();
    throw { status: 401, message: 'Unauthorized' };
  }

  try {
    const refreshed = await refreshTokenApi(session.refreshToken);

    updateTokens({
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
    });

    res = await makeRequest(refreshed.accessToken);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw {
        status: res.status,
        message: error.message || 'Request failed after refresh',
      };
    }

    return res.json();
  } catch {
    logout();
    throw { status: 401, message: 'Session expired' };
  }
}
