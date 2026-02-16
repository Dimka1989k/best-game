'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';
import { logoutApi } from '@/lib/api/auth.api';
import { useTranslation } from 'react-i18next';

export function useLogout() {
  const router = useRouter();
  const { session, logout } = useAuthStore();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      if (session?.accessToken) {
        await logoutApi(session.accessToken);
      }
    } catch {
    } finally {
      logout();
      toast.success(t('auth.userlogOut'));
      router.replace('/auth/login');
    }
  };

  return handleLogout;
}
