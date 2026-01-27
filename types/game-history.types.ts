export type GameType = 'crash' | 'plinko' | 'mines' | 'cases';

export type GameHistoryRow = {
  id: string;
  gameType: GameType;
  time: string;
  betAmount: number;
  multiplier?: number;
  winAmount: number;
  status: 'won' | 'lost';
};
