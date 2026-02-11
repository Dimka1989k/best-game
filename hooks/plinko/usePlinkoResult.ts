import { usePlinkoStore } from '@/store/usePlinkoStore';

export function usePlinkoResult() {
  const { isPlaying, lastWin, lastMultiplier, betAmount, balls } = usePlinkoStore();

  const totalBet = betAmount * balls;

  if (isPlaying) {
    return {
      mode: 'potential' as const,
      multiplier: lastMultiplier,
      winAmount: totalBet * lastMultiplier - totalBet,
    };
  }

  return {
    mode: 'result' as const,
    multiplier: lastMultiplier,
    winAmount: lastWin,
  };
}
