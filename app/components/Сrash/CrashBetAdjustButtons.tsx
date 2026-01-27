'use client';

import { Button } from '@/components/ui/button';
import { useCrashStore } from '@/store/useCrashStore';

import { BET_ADJUST_BUTTONS, type BetAdjustAction } from './crashBetButtons.constants';

type Props = {
  onSyncAmount: () => void;
  getCurrentAmount: () => number;
};

export function CrashBetAdjustButtons({ onSyncAmount, getCurrentAmount }: Props) {
  const store = useCrashStore.getState();

  const handleAction = (action: BetAdjustAction) => {
    store.setAmount(getCurrentAmount());

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
      {BET_ADJUST_BUTTONS.map(({ label, action }) => (
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
