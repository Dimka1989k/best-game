import { useMutation, useQuery } from '@tanstack/react-query';
import { minesApi } from '@/lib/api/mines/mines.api';
import { useMinesStore } from '@/store/useMinesStore';
import type { StartMinesPayload } from '@/types/mines.types';
import { useUserStore } from '@/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { MinesStatus } from '@/types/mines.types';

export const useStartMinesGame = () => {
  const startGame = useMinesStore((s) => s.startGame);
  const changeBalance = useUserStore((s) => s.changeBalance);

  return useMutation({
    mutationFn: (payload: StartMinesPayload) => minesApi.start(payload),

    onSuccess: (res, vars) => {
      startGame({
        gameId: res.gameId,
        betAmount: vars.amount,
        gridSize: vars.gridSize,
        minesCount: vars.minesCount,
        multipliers: res.multipliers,
      });
      changeBalance(-vars.amount);
    },
  });
};

type RevealTileVars = {
  gameId: string;
  position: number;
};

export const useRevealMinesTile = () => {
  const revealTile = useMinesStore((s) => s.revealTile);
  const finishGame = useMinesStore((s) => s.finishGame);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId, position }: RevealTileVars) => minesApi.reveal(gameId, position),

    onSuccess: async (res) => {
      revealTile({
        isMine: res.isMine,
        multiplier: res.currentMultiplier,
        currentValue: res.currentValue,
        revealedTiles: res.revealedTiles,
      });

      if (res.isMine) {
        const history = await minesApi.history(1, 0);
        const lastGame = history.games[0];

        if (!lastGame?.minePositions) {
          console.error('minePositions missing in history response');
          return;
        }

        finishGame({
          status: MinesStatus.Lost,
          minePositions: lastGame.minePositions,
          multiplier: lastGame.cashoutMultiplier ?? 1,
          winAmount: 0,
        });
        queryClient.invalidateQueries({ queryKey: ['mines', 'history'] });
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      }
    },
  });
};

export const useCashoutMines = () => {
  const finishGame = useMinesStore((s) => s.finishGame);
  const changeBalance = useUserStore((s) => s.changeBalance);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId: string) => minesApi.cashout(gameId),

    onSuccess: (res) => {
      finishGame({
        status: MinesStatus.CashedOut,
        minePositions: res.minePositions,
        multiplier: res.multiplier,
        winAmount: res.winAmount,
      });
      changeBalance(res.winAmount);
      queryClient.invalidateQueries({ queryKey: ['mines', 'history'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
};

export const useActiveMinesGame = () =>
  useQuery({
    queryKey: ['mines', 'active'],
    queryFn: minesApi.active,
    staleTime: 0,
  });

export const useMinesHistory = (limit = 10, offset = 0) =>
  useQuery({
    queryKey: ['mines', 'history', limit, offset],
    queryFn: () => minesApi.history(limit, offset),
    placeholderData: (previousData) => previousData,
  });
