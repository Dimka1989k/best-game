'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Image from 'next/image';
import Logo from '@/assets/logo.svg';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { registerSchema, type RegisterFormValues } from '@/lib/validators/auth.schema';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { PasswordValidationMessage } from '@/utils/PasswordValidationMessage';

import { useRegister } from '@/hooks/auth/useRegister';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const userNameValue = useWatch({
    control: form.control,
    name: 'userName',
    defaultValue: '',
  });

  const passwordValue = useWatch({
    control: form.control,
    name: 'password',
    defaultValue: '',
  });

  const emailValue = useWatch({
    control: form.control,
    name: 'email',
    defaultValue: '',
  });

  const {
    lengthRule,
    requirementsRules,
    isValid: isPasswordValid,
  } = usePasswordValidation(passwordValue);

  const isUserNameValid = userNameValue.length > 0 && !form.formState.errors.userName;

  const isEmailValid = emailValue.length > 0 && !form.formState.errors.email;

  const registerMutation = useRegister();

  function onSubmitForm(values: RegisterFormValues) {
    registerMutation.mutate({
      username: values.userName,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="bg-bg-form pb-4 flex flex-col justify-center items-center radius-md p-10 max-md:p-8 w-full max-w-115.5">
      <div className="button-red radius-smm p-3 max-md:p-2 shadow-logo">
        <Image src={Logo} alt="Logo" className="max-md:size-6" />
      </div>
      <h1 className="text-white text-satoshi mt-4 mb-2 max-md:mb-1 max-md:text-satoshi-small!">
        {t('auth.blaze')}
      </h1>
      <h2 className="text-gray text-inter-h2 mb-10 max-md:text-inter-main!">
        {t('auth.welcomeBack')}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full max-w-115.5">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-manrope text-gray">{t('auth.username')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('auth.enterUsername')}
                    className="bg-white radius-sm h-11 w-full max-w-95.5 text-blacked! text-inter-secondary"
                    style={
                      form.formState.isSubmitted && isUserNameValid
                        ? {
                            borderColor: 'var(--color-green)',
                            borderWidth: '1.5px',
                            boxShadow: 'none',
                          }
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage className="text-red! text-inter-secondary" />
                {form.formState.isSubmitted && isUserNameValid && (
                  <p className="text-green! text-inter-secondary">Successfully entered</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-manrope text-gray">{t('auth.email')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('auth.enterEmail')}
                    className="bg-white radius-sm h-11 w-full max-w-95.5 text-blacked! text-inter-secondary"
                    style={
                      form.formState.isSubmitted && isEmailValid
                        ? {
                            borderColor: 'var(--color-green)',
                            borderWidth: '1.5px',
                            boxShadow: 'none',
                          }
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage className="text-red! text-inter-secondary" />
                {form.formState.isSubmitted && !form.formState.errors.email && isEmailValid && (
                  <p className="text-green! text-inter-secondary">Successfully entered</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-manrope text-gray">{t('auth.password')}</FormLabel>
                <div className="relative w-full max-w-95.5">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('auth.enterPassword')}
                      className="bg-white radius-sm h-11 w-full text-blacked! text-inter-secondary pr-10"
                      style={
                        form.formState.isSubmitted && isPasswordValid
                          ? {
                              borderColor: 'var(--color-green)',
                              borderWidth: '1.5px',
                              boxShadow: 'none',
                            }
                          : undefined
                      }
                    />
                  </FormControl>
                  <Button
                    disabled={registerMutation.isPending}
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-blacked! transition cursor-pointer px-0!"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </div>
                <PasswordValidationMessage
                  showError={form.formState.isSubmitted && !!fieldState.error}
                  lengthRule={lengthRule}
                  requirementsRules={requirementsRules}
                  isValid={form.formState.isSubmitted && isPasswordValid}
                />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitted && !form.formState.isValid}
            type="submit"
            variant="default"
            className="transition-shadow duration-200 mb-8 mt-8 button-red w-full max-w-95.5 radius-pill py-3.5 h-full max-h-12 text-btn! text-inter-main relative px-0 cursor-pointer"
          >
            <span className="mx-auto">{t('auth.signUp')}</span>
          </Button>
          <Link href="/auth/login">
            <p className="text-blue active:text-active-link hover:text-color-link transition-colors duration-200 ease-in-out text-center mb-4 max-md:mb-2 text-manrope">
              {t('auth.alreadyHaveAccount')}
            </p>
          </Link>
          <div className="bg-color-lines w-full max-w-95.5 h-px"></div>
          <p className="text-gray text-center text-inter-small mt-4 max-md:mt-2">
            {t('auth.accountStored')}
          </p>
        </form>
      </Form>
    </div>
  );
}
