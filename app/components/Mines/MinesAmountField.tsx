'use client';

import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import ButtonGroup from './ButtonGroup';
import { useTranslation } from 'react-i18next';

type FormValues = {
  minesCount: number;
};

export default function MinesAmountField() {
  const { register } = useFormContext<FormValues>();
  const { t } = useTranslation();

  return (
    <FormItem className="text-left">
      <FormLabel className="text-gray! text-inter-secondary">
        {t('games.mines.mineAmount')}
      </FormLabel>
      <div className="relative">
        <FormControl>
          <Input
            type="number"
            disabled
            {...register('minesCount')}
            className="text-gray! text-inter-main w-full mb-2 max-md:mb-4 bg-color-chat border-none radius-sm h-11"
          />
        </FormControl>
        <ButtonGroup />
      </div>
    </FormItem>
  );
}
