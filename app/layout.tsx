import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { ClientRoot } from './ClientRoot';

import { HideOnPath } from './routing/HideOnPath';
import { AppSidebar } from './components/MainPage/AppSideBar';

import { SidebarProvider } from '@/components/ui/sidebar';
import Header from './components/MainPage/Header';
import { AppBootstrap } from './AppBootstrap';
import I18nProvider from '@/providers/I18nProvider';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function () {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'light') {
                document.documentElement.classList.add('light');
              } else {
                document.documentElement.classList.remove('light');
              }
            } catch (e) {}
          })();
        `,
          }}
        />
      </head>
      <body className={`${interFont.variable} ${manropeFont.variable} ${satoshi.variable} bg-main`}>
        <I18nProvider>
          <QueryProvider>
            <SidebarProvider defaultOpen={false}>
              <AppBootstrap />
              <HideOnPath path={['/auth/login', '/auth/register']}>
                <Header />
                <AppSidebar />
              </HideOnPath>
              <ClientRoot>{children}</ClientRoot>
              <Toaster className="text-blacked!" />
            </SidebarProvider>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
