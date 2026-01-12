import { z } from 'zod';

export const passwordRules = {
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*]/,
};

export const usernameRules = {
  pattern: /^[A-Z][a-z]+( [A-Z][a-z]+)?$/,
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

export const registerSchema = z.object({
  email: z.email({ message: 'This email is not valid' }).min(1, 'Email is required'),

  userName: z
    .string()
    .min(3, { message: 'This username is not valid' })
    .max(20, { message: 'This username is not valid' })
    .regex(usernameRules.pattern, {
      message: 'This username is not valid',
    }),

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
export type RegisterFormValues = z.infer<typeof registerSchema>;
