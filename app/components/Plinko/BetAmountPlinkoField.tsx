'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { usePlinkoStore } from '@/store/usePlinkoStore';

import dollarIcon from '@/assets/icon-dollar.svg';
import { PlinkoBetAdjustButtons } from './PlinkoBetAdjustButtons';

type FormValues = {
  amount: string;
};

export default function BetAmountPlinkoField() {
  const { setValue, watch } = useFormContext<FormValues>();
  const betAmount = usePlinkoStore((s) => s.betAmount);
  const changeBetAmount = usePlinkoStore((s) => s.changeBetAmount);

  useEffect(() => {
    setValue('amount', String(betAmount), { shouldDirty: false });
  }, [betAmount, setValue]);

  return (
    <FormItem className="text-left">
      <FormLabel className="text-gray! text-inter-secondary">Bet Amount</FormLabel>

      <div className="relative">
        <Image src={dollarIcon} alt="" className="absolute top-2.5 left-2" />

        <FormControl>
          <Input
            type="number"
            step="0.01"
            value={watch('amount')}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!Number.isNaN(value)) {
                changeBetAmount(value);
              }
            }}
            className="text-gray! text-inter-main w-full mb-4 bg-color-chat border-none radius-sm h-11 pl-11"
          />
        </FormControl>

        <PlinkoBetAdjustButtons />
      </div>
    </FormItem>
  );
}
