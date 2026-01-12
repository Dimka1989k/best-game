import type { AuthSession, RefreshSession } from '@/types/auth.types';
import { apiFetch } from './client';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  username: string;
};

export function loginApi(data: LoginPayload) {
  return apiFetch<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function registerApi(data: RegisterPayload) {
  return apiFetch<{ username: string; email: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function refreshTokenApi(refreshToken: string) {
  return apiFetch<RefreshSession>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}
