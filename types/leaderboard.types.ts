export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'all';

export interface LeaderboardPlayer {
  rank: number;
  username: string;
  totalWagered: number;
  gamesPlayed: number;
  winRate: number;
}

export interface LeaderboardResponse {
  players: LeaderboardPlayer[];
  currentUser: LeaderboardPlayer | null;
}
