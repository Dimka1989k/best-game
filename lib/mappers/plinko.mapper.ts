import type { BackendPlinkoGame, PlinkoHistoryRow } from '../../types/plinko.types';

export function mapPlinkoHistory(game: BackendPlinkoGame): PlinkoHistoryRow {
  const totalBet = game.betAmount * game.ballsCount;
  const winAmount = game.totalWin;
  const netWin = winAmount - totalBet;

  return {
    id: game._id,
    betAmount: game.betAmount,
    rows: game.linesCount,
    risk: game.riskLevel,
    multiplier: Number(game.avgMultiplier),
    totalBet,
    winAmount,
    netWin,
    status: game.status,
    createdAt: game.createdAt,
  };
}
