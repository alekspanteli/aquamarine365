import { Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/ThemeProvider';
import DeferredClient from '@/components/DeferredClient';
import './globals.css';

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

export const metadata = {
  metadataBase: new URL('https://aquamarine365.com'),
  title: 'Aquamarine — Private Villas in Ayia Napa, Cyprus',
  description:
    "Owner-operated villas and seafront suites in Ayia Napa. Direct booking, no platform fees, on-island support 24/7."
};

export default function RootLayout({ children }) {
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
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
          <DeferredClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
