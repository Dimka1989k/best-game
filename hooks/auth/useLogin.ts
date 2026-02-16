import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/lib/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ApiError } from '@/lib/api/api-error';
import type { LoginPayload } from '@/lib/api/auth.api';
import type { AuthSession } from '@/types/auth.types';
import { useTranslation } from 'react-i18next';

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();
  const { t } = useTranslation();

  return useMutation<AuthSession, ApiError, LoginPayload>({
    mutationFn: loginApi,

    onSuccess: (data) => {
      login(data);
      toast.success(t('auth.welcomeBack', { name: data.userName }));
      router.push('/');
    },

    onError: (error) => {
      switch (error.status) {
        case 401:
          toast.error(t('auth.invalidCredentials'));
          break;

        case 404:
          toast.error(t('auth.userNotFound'));
          break;

        case 429:
          toast.error(t('auth.tooManyAttempts'));
          break;

        default:
          toast.error(t('auth.somethingWrong'));
      }
    },
  });
}
