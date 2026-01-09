import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

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
      <body
        className={`${interFont.variable} ${manropeFont.variable} ${satoshi.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
