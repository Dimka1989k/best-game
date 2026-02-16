'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { useMinesStore } from '@/store/useMinesStore';

import dollarIcon from '@/assets/icon-dollar.svg';
import { MinesBetAdjustButtons } from './MinesBetAdjustButtons';
import { useTranslation } from 'react-i18next';

type FormValues = {
  amount: string;
};

export default function BetAmountMinesField() {
  const { register, getValues, setValue } = useFormContext<FormValues>();
  const store = useMinesStore.getState();
  const { t } = useTranslation();

  const syncAmountFromStore = () => {
    setValue('amount', String(store.betAmount), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FormItem className="text-left">
      <FormLabel className="text-gray! text-inter-secondary">{t('bet.betAmount')}</FormLabel>
      <div className="relative">
        <Image src={dollarIcon} alt="" className="absolute top-2.5 left-2" />
        <FormControl>
          <Input
            type="number"
            step="0.01"
            placeholder="10.00"
            {...register('amount', {
              required: true,
              min: 0.1,
              max: 10000,
            })}
            className="text-gray! text-inter-main w-full mb-6 bg-color-chat border-none radius-sm h-11 pl-11"
          />
        </FormControl>
        <MinesBetAdjustButtons
          getCurrentAmount={() => Number(getValues('amount')) || 0}
          onSyncAmount={syncAmountFromStore}
        />
      </div>
    </FormItem>
  );
}
