'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type HideOnPathProps = {
  path: string | Array<string | RegExp>;
  match?: 'equals' | 'startsWith';
  children: ReactNode;
};

export function HideOnPath({ path, match = 'equals', children }: HideOnPathProps) {
  const pathname = usePathname();
  const list = Array.isArray(path) ? path : [path];

  const shouldHide = list.some((p) => {
    if (p instanceof RegExp) return p.test(pathname);
    return match === 'startsWith' ? pathname.startsWith(p) : pathname === p;
  });

  if (shouldHide) return null;
  return children;
}
