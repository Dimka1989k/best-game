'use client';

import { Button } from '@/components/ui/button';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { BET_PLINKO_BUTTONS, type BetPlinkoAction } from './PlinkoBetButtons.constants';

export function PlinkoBetAdjustButtons() {
  const half = usePlinkoStore((s) => s.halfAmount);
  const double = usePlinkoStore((s) => s.doubleAmount);
  const max = usePlinkoStore((s) => s.maxAmount);

  const handleAction = (action: BetPlinkoAction) => {
    switch (action) {
      case 'half':
        half();
        break;
      case 'double':
        double();
        break;
      case 'max':
        max(10000);
        break;
    }
  };

  return (
    <div className="flex absolute top-2 right-2 gap-1 h-6">
      {BET_PLINKO_BUTTONS.map(({ label, action }) => (
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
