'use client';

import { AuthGate } from '@/app/routing/AuthGate';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
