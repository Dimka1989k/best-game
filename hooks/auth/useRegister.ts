import { useMutation } from '@tanstack/react-query';
import { registerApi, type RegisterPayload } from '@/lib/api/auth.api';
import type { ApiError } from '@/lib/api/api-error';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type RegisterResponse = {
  username: string;
  email: string;
};

export function useRegister() {
  const router = useRouter();

  return useMutation<RegisterResponse, ApiError, RegisterPayload>({
    mutationFn: registerApi,

    onSuccess: () => {
      toast.success('Account successfully created');
      router.push('/auth/login');
    },
  });
}
