import { apiFetch } from './client';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export function loginApi(data: LoginPayload) {
  return apiFetch<{
    accessToken: string;
    refreshToken: string;
    userId: string;
    userName: string;
  }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function registerApi(data: RegisterPayload) {
  return apiFetch<{
    username: string;
    email: string;
  }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function refreshTokenApi(refreshToken: string) {
  return apiFetch<{
    accessToken: string;
    refreshToken: string;
    userId: string;
  }>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}
