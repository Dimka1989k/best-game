'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useStartMinesGame } from '@/hooks/mines/useMinesGame';
import { useMinesStore } from '@/store/useMinesStore';
import { useEffect } from 'react';

import PotentialMinesWin from './PotentialMinesWin';
import BetAmountMinesField from './BetAmountMinesField';
import MinesAmountField from './MinesAmountField';
import MinesBetActions from './MinesBetActions';
import GridSizeMines from './GridSizeMines';
import { useTranslation } from 'react-i18next';

export type FormValues = {
  amount: string;
  minesCount: number;
};

export default function MinesBetForm() {
  const betAmount = useMinesStore((s) => s.betAmount);
  const gridSize = useMinesStore((s) => s.gridSize);
  const { t } = useTranslation();

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: '10',
      minesCount: 3,
    },
  });

  const startMutation = useStartMinesGame();

  const onSubmit = methods.handleSubmit((values) => {
    const amount = Number(values.amount);
    const minesCount = values.minesCount;
    const maxMines = gridSize * gridSize - 1;

    if (!Number.isFinite(amount) || amount < 0.1 || amount > 10000) return;
    if (!Number.isInteger(minesCount) || minesCount < 1 || minesCount > maxMines) return;

    startMutation.mutate({
      amount,
      minesCount,
      gridSize,
    });
  });

  useEffect(() => {
    methods.setValue('amount', String(betAmount), {
      shouldValidate: true,
    });
  }, [betAmount, methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="bg-cards-bg radius-md py-6 px-8 w-108 max-lg:w-full text-center h-full"
      >
        <p className="text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-8">
          {t('games.mines.configuration')}
        </p>
        <BetAmountMinesField />
        <MinesAmountField />
        <p className="text-left text-white text-manrope font-medium!">
          {t('games.mines.gridSize')}
        </p>
        <GridSizeMines />
        <MinesBetActions />
        <PotentialMinesWin />
      </form>
    </FormProvider>
  );
}
