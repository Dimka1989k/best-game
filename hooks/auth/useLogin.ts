import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/lib/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ApiError } from '@/lib/api/api-error';
import type { LoginPayload } from '@/lib/api/auth.api';
import type { AuthSession } from '@/types/auth.types';

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  return useMutation<AuthSession, ApiError, LoginPayload>({
    mutationFn: loginApi,

    onSuccess: (data) => {
      login(data);
      toast.success(`Welcome back, ${data.userName}`);
      router.push('/');
    },

    onError: (error) => {
      switch (error.status) {
        case 401:
          toast.error('Invalid email or password');
          break;

        case 404:
          toast.error('User does not exist');
          break;

        case 429:
          toast.error('Too many attempts. Please try later');
          break;

        default:
          toast.error('Something went wrong. Please try again');
      }
    },
  });
}
