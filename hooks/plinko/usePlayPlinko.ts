import { useMutation, useQueryClient } from '@tanstack/react-query';
import { plinkoApi } from '@/lib/api/plinko/plinko.api';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { useUserStore } from '@/store/useUserStore';
import type { PlinkoDropResponse, Risk, Row, PlinkoHistoryRow } from '@/types/plinko.types';
import { PlinkoStatus } from '@/types/plinko.types';

type PlayPlinkoPayload = {
  amount: number;
  balls: number;
  risk: Risk;
  lines: Row;
};

export function usePlayPlinko() {
  const setDrops = usePlinkoStore((s) => s.setDrops);
  const finishGame = usePlinkoStore((s) => s.finishGame);
  const changeBalance = useUserStore((s) => s.changeBalance);
  const queryClient = useQueryClient();

  return useMutation<PlinkoDropResponse, Error, PlayPlinkoPayload>({
    mutationFn: plinkoApi.drop,

    onSuccess: (res, vars) => {
      const totalBet = vars.amount * vars.balls;
      const netWin = res.totalWin - totalBet;

      setDrops(res.drops);

      finishGame({
        totalWin: netWin,
        multiplier: res.totalWin / totalBet,
      });

      changeBalance(-totalBet);
      changeBalance(res.totalWin);

      queryClient.setQueryData<PlinkoHistoryRow[]>(['plinko', 'history'], (old = []) => [
        {
          id: crypto.randomUUID(),
          betAmount: vars.amount,
          rows: vars.lines,
          risk: vars.risk,
          multiplier: totalBet > 0 ? res.totalWin / totalBet : 1,
          totalBet,
          winAmount: res.totalWin,
          netWin,
          status: netWin > 0 ? PlinkoStatus.Won : PlinkoStatus.Lost,
          createdAt: new Date().toISOString(),
        },
        ...old,
      ]);

      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}
