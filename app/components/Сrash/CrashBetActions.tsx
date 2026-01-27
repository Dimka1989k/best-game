'use client';

import Image from 'next/image';
import { memo } from 'react';
import { Button } from '@/components/ui/button';

import tablerCoin from '@/assets/tablerCoin.svg';
import walletIcon from '@/assets/walletIcon.svg';

type Props = {
  canPlaceBet: boolean;
  onCashout: () => void;
  isCashoutDisabled: boolean;
};

export const CrashBetActions = memo(function CrashBetActions({
  canPlaceBet,
  onCashout,
  isCashoutDisabled,
}: Props) {
  return (
    <div className="flex flex-col">
      <Button
        type="submit"
        disabled={!canPlaceBet}
        className="relative mb-4 cursor-pointer flex items-center justify-center text-inter-bold button-red text-white radius-pill h-12"
      >
        <p>Place bet</p>
        <Image src={tablerCoin} alt="tablerCoin" className="absolute right-2.5" />
      </Button>
      <Button
        type="button"
        disabled={isCashoutDisabled}
        onClick={onCashout}
        className="relative cursor-pointer flex items-center justify-center text-inter-bold button-yellow text-white radius-md h-12"
      >
        <p>Cashout</p>
        <Image src={walletIcon} alt="walletIcon" className="absolute right-2.5" />
      </Button>
    </div>
  );
});
