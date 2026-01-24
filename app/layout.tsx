import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';

import { HideOnPath } from './routing/HideOnPath';
import { AppSidebar } from './components/MainPage/AppSideBar';

import { SidebarProvider } from '@/components/ui/sidebar';
import Header from './components/MainPage/Header';
import { AppBootstrap } from './AppBootstrap';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const manropeFont = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Best Games',
  description: 'Play our best games: Plinko, Cases, and Rocket.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${manropeFont.variable} ${satoshi.variable} bg-main`}>
        <QueryProvider>
          <SidebarProvider defaultOpen={false}>
            <AppBootstrap />
            <HideOnPath path={['/auth/login', '/auth/register']}>
              <Header />
              <AppSidebar />
            </HideOnPath>
            {children}
            <Toaster />
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
