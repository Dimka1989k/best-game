'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-[1.15rem] w-9 shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=unchecked]:bg-white data-[state=checked]:bg-color-green',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block h-3.5 w-3.5 rounded-full transition-transform data-[state=unchecked]:translate-x-px  data-[state=checked]:translate-x-4.5 data-[state=unchecked]:bg-color-green data-[state=checked]:bg-white',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
