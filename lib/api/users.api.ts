import { apiFetch } from './client';

export type CurrentUserResponse = {
  username: string;
  email: string;
  balance: number;
  totalWagered: number;
  gamesPlayed: number;
  totalWon: number;
};

export function getCurrentUser() {
  return apiFetch<CurrentUserResponse>('/users/current', {
    method: 'GET',
  });
}
