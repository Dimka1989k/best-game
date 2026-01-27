import { GameHistoryRow } from '@/types/game-history.types';
import { CrashBetStatus } from '@/types/crash.types';

type CrashBetApi = {
  betId: string;
  amount: number;
  cashoutMultiplier?: number;
  winAmount?: number;
  status: CrashBetStatus;
  crashPoint: number;
  createdAt: string;
};

export function mapCrashBetsToHistory(bets: CrashBetApi[]): GameHistoryRow[] {
  return bets.map((bet) => ({
    id: bet.betId,
    gameType: 'crash',
    time: bet.createdAt,
    betAmount: bet.amount,
    multiplier: bet.status === CrashBetStatus.Won ? bet.cashoutMultiplier : bet.crashPoint,
    winAmount: bet.winAmount ?? 0,
    status: bet.status,
  }));
}
