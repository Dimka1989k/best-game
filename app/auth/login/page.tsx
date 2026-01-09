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
import loginIcon from '@/assets/login-icon.svg';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { loginSchema, type LoginFormValues } from '@/lib/validators/auth.schema';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { PasswordValidationMessage } from '@/utils/PasswordValidationMessage';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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

  const isEmailValid = emailValue.length > 0 && !form.formState.errors.email;

  function onSubmitForm(values: LoginFormValues) {
    console.log(values);
  }

  return (
    <div className="bg-bg-form flex flex-col justify-center items-center radius-md p-10 max-md:p-8 w-full max-w-115.5">
      <div className="button-red radius-smm p-3 max-md:p-2 shadow-logo">
        <Image src={Logo} alt="Logo" className="max-md:size-6" />
      </div>
      <h1 className="text-white text-satoshi mt-4 mb-2 max-md:mb-1 max-md:text-satoshi-small!">
        Blaze Casino
      </h1>
      <h2 className="text-gray text-inter-h2 mb-10 max-md:text-inter-main!">Welcome back!</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full max-w-115.5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-manrope text-gray">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter email"
                    className="bg-white radius-sm h-11 w-full max-w-95.5 text-black text-inter-secondary"
                  />
                </FormControl>
                <FormMessage className="text-red! text-inter-secondary" />
                {!form.formState.errors.email && isEmailValid && (
                  <p className="text-green text-inter-secondary">Successfully entered</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-manrope text-gray">Password</FormLabel>
                <div className="relative w-full max-w-95.5">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      className="bg-white radius-sm h-11 w-full text-black text-inter-secondary pr-10"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-black transition cursor-pointer px-0!"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </div>
                <PasswordValidationMessage
                  showError={!!fieldState.error}
                  lengthRule={lengthRule}
                  requirementsRules={requirementsRules}
                  isValid={isPasswordValid}
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="mb-8 mt-8 button-red w-full max-w-95.5 radius-pill py-3.5 h-full max-h-12 text-white! text-inter-main relative px-0 cursor-pointer"
          >
            <span className="mx-auto">Log in</span>
            <span className="absolute right-2 flex items-center">
              <Image src={loginIcon} alt="loginIcon" />
            </span>
          </Button>
          <Link href="/auth/register">
            <p className="text-blue text-center mb-4 max-md:mb-2 text-manrope">
              Don`t have an account? Register
            </p>
          </Link>
          <div className="bg-color-lines w-full max-w-95.5 h-px"></div>
          <p className="text-gray text-center text-inter-small mt-4 max-md:mt-2">
            Your account data is stored locally in your browser
          </p>
        </form>
      </Form>
    </div>
  );
}
