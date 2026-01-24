import { z } from 'zod';

export const crashFormSchema = z
  .object({
    amount: z
      .string()
      .min(1, 'Enter bet amount')
      .refine((v) => !isNaN(Number(v)), 'Must be a number')
      .refine((v) => Number(v) >= 0.1, 'Min bet is 0.1')
      .refine((v) => Number(v) <= 10000, 'Max bet is 10000'),

    autoCashoutEnabled: z.boolean(),

    autoCashout: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.autoCashoutEnabled) {
      const value = Number(data.autoCashout);

      if (!data.autoCashout || isNaN(value)) {
        ctx.addIssue({
          path: ['autoCashout'],
          message: 'Auto cashout is required',
          code: 'custom',
        });
        return;
      }

      if (value < 1) {
        ctx.addIssue({
          path: ['autoCashout'],
          message: 'Min auto cashout is 1.0',
          code: 'custom',
        });
      }
    }
  });

export type CrashFormValues = z.infer<typeof crashFormSchema>;
