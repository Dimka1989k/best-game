'use client';

import { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

function handleAutoCashoutToggle(
  checked: boolean,
  onChange: (value: boolean) => void,
  setValue: (name: 'autoCashout', value: string) => void,
  clearErrors: (name: 'autoCashout') => void,
) {
  onChange(checked);

  if (!checked) {
    setValue('autoCashout', '');
    clearErrors('autoCashout');
  }
}

export const AutoCashoutField = memo(function AutoCashoutField() {
  const { control, setValue, clearErrors } = useFormContext();

  const { field: autoCashout } = useController({
    name: 'autoCashout',
    control,
  });

  const { field: enabled } = useController({
    name: 'autoCashoutEnabled',
    control,
  });

  return (
    <FormItem className="text-left">
      <FormLabel className="text-gray! text-inter-secondary">Auto Cashout (optional)</FormLabel>
      <div className="relative">
        <FormControl>
          <Input
            type="number"
            {...autoCashout}
            disabled={!enabled.value}
            placeholder="e.g 2.00"
            className="text-gray! text-inter-main w-full mb-8 bg-color-chat border-none focus-visible:none radius-sm h-11"
          />
        </FormControl>
        <div className="flex items-center absolute top-3 right-2.5">
          <Switch
            checked={enabled.value}
            onCheckedChange={(checked) =>
              handleAutoCashoutToggle(checked, enabled.onChange, setValue, clearErrors)
            }
          />
        </div>
      </div>
    </FormItem>
  );
});
