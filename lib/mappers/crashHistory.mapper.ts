import { GameHistoryRow } from '@/types/game-history.types';

type CrashBetApi = {
  betId: string;
  amount: number;
  cashoutMultiplier?: number;
  winAmount?: number;
  status: 'won' | 'lost';
  crashPoint: number;
  createdAt: string;
};

export function mapCrashBetsToHistory(bets: CrashBetApi[]): GameHistoryRow[] {
  return bets.map((bet) => ({
    id: bet.betId,
    gameType: 'crash',
    time: bet.createdAt,
    betAmount: bet.amount,
    multiplier: bet.status === 'won' ? bet.cashoutMultiplier : bet.crashPoint,
    winAmount: bet.winAmount ?? 0,
    status: bet.status,
  }));
}
