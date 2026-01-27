'use client';

import Image from 'next/image';
import { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { CrashBetAdjustButtons } from './CrashBetAdjustButtons';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

import dollarIcon from '@/assets/icon-dollar.svg';
import { useCrashStore } from '@/store/useCrashStore';

export const BetAmountField = memo(function BetAmountField() {
  const { control, setValue } = useFormContext();

  const { field } = useController({
    name: 'amount',
    control,
    rules: {
      required: true,
      validate: (v) => Number(v) > 0,
    },
  });

  const syncAmountFromStore = () => {
    const storeAmount = useCrashStore.getState().amount;
    setValue('amount', String(storeAmount), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FormItem className="text-left">
      <FormLabel className="text-gray! text-inter-secondary">Bet Amount</FormLabel>
      <div className="relative">
        <Image src={dollarIcon} alt="dollarIcon" className="absolute top-2.5 left-2" />
        <FormControl>
          <Input
            type="number"
            {...field}
            onChange={field.onChange}
            placeholder="10.000"
            className="text-gray! text-inter-main w-full mb-6 bg-color-chat border-none focus-visible:none radius-sm h-11 pl-11"
          />
        </FormControl>
        <CrashBetAdjustButtons
          onSyncAmount={syncAmountFromStore}
          getCurrentAmount={() => Number(field.value || 0)}
        />
      </div>
    </FormItem>
  );
});
