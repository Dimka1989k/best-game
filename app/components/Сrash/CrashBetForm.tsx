'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CrashBetAdjustButtons } from './CrashBetAdjustButtons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import dollarIcon from '@/assets/icon-dollar.svg';
import tablerCoin from '@/assets/tablerCoin.svg';
import walletIcon from '@/assets/walletIcon.svg';

import { useCrashStore } from '@/store/useCrashStore';
import { useCrashGame } from '@/hooks/useCrashGame';
import { crashFormSchema, type CrashFormValues } from '@/lib/validators/crash.schema';
import { useMemo } from 'react';

type Props = {
  state: string;
  multiplier: number;
};

export function CrashBetForm({ state, multiplier }: Props) {
  const { amount, setAmount } = useCrashStore();
  const { placeBet, cashout } = useCrashGame();

  const form = useForm<CrashFormValues>({
    resolver: zodResolver(crashFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: '',
      autoCashout: '',
      autoCashoutEnabled: false,
    },
  });

  const potentialWin = useMemo(() => {
    if (state !== 'running') return 0;
    return amount * multiplier;
  }, [amount, multiplier, state]);

  useEffect(() => {
    if (state === 'waiting') {
      form.reset({
        amount: '',
        autoCashout: '',
      });
    }
  }, [state, form]);

  const { setValue } = form;

  const syncAmountFromStore = () => {
    const amount = useCrashStore.getState().amount;
    setValue('amount', String(amount), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const amountValue = useWatch({
    control: form.control,
    name: 'amount',
  });

  const autoCashoutValue = useWatch({
    control: form.control,
    name: 'autoCashout',
  });

  const autoCashoutEnabled = useWatch({
    control: form.control,
    name: 'autoCashoutEnabled',
  });

  const canPlaceBet =
    state === 'waiting' &&
    Number(amountValue) > 0 &&
    !form.formState.errors.amount &&
    (!autoCashoutEnabled || (Boolean(autoCashoutValue) && !form.formState.errors.autoCashout));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          const amount = Number(values.amount);
          if (!amount || amount <= 0) return;

          setAmount(amount);
          placeBet({
            amount,
            autoCashout: autoCashoutEnabled ? Number(autoCashoutValue) : undefined,
          });
        })}
        className="bg-cards-bg radius-md py-6 px-8 w-108 max-lg:w-full text-center h-full"
      >
        <p className="text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-8 max-md:text-2xl!">
          Crash Configuration
        </p>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-gray! text-inter-secondary">Bet Amount</FormLabel>
              <div className="relative">
                <Image src={dollarIcon} alt="dollarIcon" className="absolute top-2.5 left-2" />
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setAmount(Number(e.target.value) || 0);
                    }}
                    placeholder="10.000"
                    className="text-gray! text-inter-main w-full mb-6 bg-color-chat border-none focus-visible:none radius-sm h-11 pl-11"
                  />
                </FormControl>
                <CrashBetAdjustButtons onSyncAmount={syncAmountFromStore} />
                <FormMessage className="absolute bottom-1 text-red! text-inter-secondary" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoCashout"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-gray! text-inter-secondary">
                Auto Cashout (optional)
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    disabled={!autoCashoutEnabled}
                    placeholder="e.g 2.00"
                    className="text-gray! text-inter-main w-full mb-8 bg-color-chat border-none focus-visible:none radius-sm h-11"
                  />
                </FormControl>
                <div className="flex items-center absolute top-3 right-2.5">
                  <Switch
                    checked={autoCashoutEnabled}
                    onCheckedChange={(checked) => {
                      form.setValue('autoCashoutEnabled', checked, {
                        shouldDirty: true,
                        shouldValidate: false,
                      });
                      if (!checked) {
                        form.setValue('autoCashout', '');
                        form.clearErrors('autoCashout');
                      }
                    }}
                  />
                </div>
                <FormMessage className="absolute bottom-3 text-red! text-inter-secondary" />
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <Button
            type="button"
            disabled={!canPlaceBet}
            onClick={() => {
              setAmount(Number(amountValue));
              placeBet({
                amount,
                autoCashout: autoCashoutEnabled ? Number(autoCashoutValue) : undefined,
              });
            }}
            className="relative mb-4 cursor-pointer flex items-center justify-center text-inter-bold button-red text-white radius-pill h-12"
          >
            <p>Place bet</p>
            <Image src={tablerCoin} alt="tablerCoin" className="absolute right-2.5" />
          </Button>
          <Button
            disabled={state !== 'running'}
            onClick={cashout}
            className="relative cursor-pointer flex items-center justify-center text-inter-bold button-yellow text-white radius-md h-12"
          >
            <p>Cashout</p>
            <Image src={walletIcon} alt="walletIcon" className="absolute right-2.5" />
          </Button>
        </div>
        {state === 'running' && (
          <div className="mt-8 mb-2">
            <div className="w-full bg-gray h-px mb-2" />
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray text-inter-main">Current Multiplier:</p>
              <p className="text-green text-inter-bold">{multiplier.toFixed(2)}X</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray text-inter-main">Potential Win:</p>
              <p className="text-green text-inter-bold">${potentialWin.toFixed(2)}</p>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
