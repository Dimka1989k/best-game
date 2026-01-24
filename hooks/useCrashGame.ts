import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crashApi } from '@/lib/api/crash/crash.api';
import { connectCrashSocket } from '@/lib/api/crash/crash.socket';
import { useCrashStore } from '@/store/useCrashStore';
import { getCurrentUser } from '@/lib/api/users.api';
import { useUserStore } from '@/store/useUserStore';

export const useCrashGame = () => {
  const store = useCrashStore();
  const queryClient = useQueryClient();

  const setUser = useUserStore((s) => s.setUser);

  const syncUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };

  const betMutation = useMutation({
    mutationFn: crashApi.bet,

    onMutate: (payload) => {
      store.placeBet('pending', 'pending', payload.amount, payload.autoCashout);
    },

    onSuccess: async (res, payload) => {
      store.placeBet(res.gameId, res.betId, payload.amount, payload.autoCashout);

      connectCrashSocket(res.gameId);
      await syncUser();
    },

    onError: () => {
      store.reset();
    },
  });

  const cashoutMutation = useMutation({
    mutationFn: () => crashApi.cashout(store.betId!),

    onSuccess: async (res) => {
      store.cashout(res.multiplier, res.winAmount);
      await syncUser();

      queryClient.invalidateQueries({ queryKey: ['game-history', 'crash'] });
    },
  });

  const finalizeBet = async () => {
    const current = await crashApi.current();
    if (!current.myBet) return;

    await syncUser();

    queryClient.invalidateQueries({
      queryKey: ['game-history', 'crash'],
    });
  };

  return {
    placeBet: (payload: { amount: number; autoCashout?: number }) => {
      if (store.state !== 'waiting') return;
      betMutation.mutate(payload);
    },

    cashout: () => cashoutMutation.mutate(),
    finalizeBet,
    isBetLoading: betMutation.isPending,
    isCashoutLoading: cashoutMutation.isPending,
  };
};
