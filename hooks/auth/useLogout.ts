'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';
import { logoutApi } from '@/lib/api/auth.api';

export function useLogout() {
  const router = useRouter();
  const { session, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      if (session?.accessToken) {
        await logoutApi(session.accessToken);
      }
    } catch {
    } finally {
      logout();
      toast.success('You have logged out');
      router.replace('/auth/login');
    }
  };

  return handleLogout;
}
