'use client';

import { Button } from '@/components/ui/button';
import { useMinesStore } from '@/store/useMinesStore';
import { BET_MINES_BUTTONS, type BetMinesAction } from './MinesBetButtons.constants';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

type Props = {
  onSyncAmount: () => void;
  getCurrentAmount: () => number;
};

export function MinesBetAdjustButtons({ onSyncAmount, getCurrentAmount }: Props) {
  const store = useMinesStore.getState();
  const { playMusic } = useMusic();

  const handleAction = (action: BetMinesAction) => {
    playMusic(Music.buttonBet);
    store.setBetAmount(getCurrentAmount());
    switch (action) {
      case 'half':
        store.halfAmount();
        break;
      case 'double':
        store.doubleAmount();
        break;
      case 'max':
        store.maxAmount(10000);
        break;
    }
    onSyncAmount();
  };

  return (
    <div className="flex absolute top-2 right-2 gap-1 h-6">
      {BET_MINES_BUTTONS.map(({ label, action }) => (
        <Button
          key={action}
          type="button"
          className="cursor-pointer bg-color-dark radius-xs px-1.5 text-white text-inter-small! h-6.5"
          onClick={() => handleAction(action)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
