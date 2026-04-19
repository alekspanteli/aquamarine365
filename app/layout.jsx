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

const SITE_NAME = 'Aquamarine';
const SITE_URL = 'https://aquamarine365.com';
const DEFAULT_TITLE = 'Aquamarine — Private Villas in Ayia Napa, Cyprus';
const DEFAULT_DESCRIPTION =
  'Owner-operated villas and seafront suites in Ayia Napa. Direct booking, no platform fees, on-island support 24/7.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s · Aquamarine' },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: 'en_GB'
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION
  },
  robots: { index: true, follow: true }
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFDFE' },
    { media: '(prefers-color-scheme: dark)', color: '#061419' }
  ],
  width: 'device-width',
  initialScale: 1
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
