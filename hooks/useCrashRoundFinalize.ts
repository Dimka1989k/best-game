import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCrashStore } from '@/store/useCrashStore';
import { useCrashGame } from '@/hooks/useCrashGame';

export function useCrashRoundFinalize() {
  const roundFinished = useCrashStore((s) => s.roundFinished);
  const resetRoundFinished = useCrashStore((s) => s.resetRoundFinished);
  const { finalizeBet } = useCrashGame();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roundFinished) return;

    finalizeBet();
    queryClient.invalidateQueries({ queryKey: ['game-history', 'crash'] });
    resetRoundFinished();
  }, [roundFinished, finalizeBet, queryClient, resetRoundFinished]);
}
