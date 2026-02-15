import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { minesApi } from '@/lib/api/mines/mines.api';
import { useMinesStore } from '@/store/useMinesStore';
import { useUserStore } from '@/store/useUserStore';
import { StartMinesPayload, MinesStatus, ActiveMinesResponse } from '@/types/mines.types';
import type { MinesHistoryResponse } from '@/types/mines.types';

export const useStartMinesGame = () => {
  const { startGame, gameId, status } = useMinesStore();
  const changeBalance = useUserStore((s) => s.changeBalance);

  return useMutation({
    mutationFn: async (payload: StartMinesPayload) => {
      if (gameId && status === 'playing') {
        throw new Error('Game already active');
      }
      return minesApi.start(payload);
    },

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
    onSuccess: (res) => {
      revealTile({
        isMine: res.isMine,
        multiplier: res.currentMultiplier,
        currentValue: res.currentValue,
        revealedTiles: res.revealedTiles,
      });

      if (res.isMine) {
        finishGame({
          status: MinesStatus.Lost,
          minePositions: res.minePositions ?? [],
          multiplier: res.currentMultiplier,
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
  const reset = useMinesStore((s) => s.reset);
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
      reset();
    },
  });
};

export const useActiveMinesGame = () => {
  const restoreGame = useMinesStore((s) => s.restoreGame);

  const query = useQuery<ActiveMinesResponse>({
    queryKey: ['mines', 'active'],
    queryFn: () => minesApi.active(),
    staleTime: 0,
  });
  if (query.data?.game) {
    restoreGame(query.data.game);
  }
  return query;
};

export const useMinesHistory = (limit = 10, offset = 0) =>
  useQuery<MinesHistoryResponse>({
    queryKey: ['mines', 'history', limit, offset],
    queryFn: () => minesApi.history(limit, offset),
  });
