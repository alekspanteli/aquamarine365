import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap'
});

const plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap'
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${GeistSans.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="relative">{children}</body>
    </html>
  );
}
