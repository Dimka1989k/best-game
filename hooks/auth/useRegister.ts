import { useMutation } from '@tanstack/react-query';
import { registerApi, type RegisterPayload } from '@/lib/api/auth.api';
import type { ApiError } from '@/lib/api/api-error';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useRegister() {
  const router = useRouter();

  return useMutation<{ username: string; email: string }, ApiError, RegisterPayload>({
    mutationFn: registerApi,

    onSuccess: () => {
      toast.success('Account successfully created');
      router.push('/auth/login');
    },

    onError: (error) => {
      switch (error.status) {
        case 409:
          toast.error('Email already in use');
          break;
        case 400:
          toast.error('Invalid username');
          break;
        case 429:
          toast.error('Too many attempts. Please try later');
          break;
        default:
          toast.error('Registration failed. Please try again.');
      }
    },
  });
}
