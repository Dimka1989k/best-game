import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/lib/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ApiError } from '@/lib/api/api-error';
import type { LoginPayload } from '@/lib/api/auth.api';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
};

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: loginApi,

    onSuccess: (data) => {
      login(data);
      toast.success(`Welcome back, ${data.userName}`);
      router.push('/');
    },
  });
}
