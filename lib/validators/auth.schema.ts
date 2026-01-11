import { z } from 'zod';

export const passwordRules = {
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*]/,
};

export const loginSchema = z.object({
  email: z.email({ message: 'This email is not valid' }).min(1, 'Email is required'),

  password: z
    .string()
    .min(8, 'Password must contain')
    .max(12, 'Password must contain')
    .superRefine((value, ctx) => {
      if (!passwordRules.upper.test(value)) {
        ctx.addIssue({ code: 'custom', message: '∙ At least one uppercase letter (A–Z)' });
      }
      if (!passwordRules.lower.test(value)) {
        ctx.addIssue({ code: 'custom', message: '∙ At least one lowercase letter (a–z)' });
      }
      if (!passwordRules.number.test(value)) {
        ctx.addIssue({ code: 'custom', message: '∙ At least one number (0–9)' });
      }
      if (!passwordRules.special.test(value)) {
        ctx.addIssue({ code: 'custom', message: '∙ At least one special character (!@#$%^&*)' });
      }
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
