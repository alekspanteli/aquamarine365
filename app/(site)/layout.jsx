import { ThemeProvider } from '@/components/ThemeProvider';
import DeferredClient from '@/components/DeferredClient';
import { VillasProvider } from '@/components/VillasProvider';
import { getVillas } from '@/sanity/fetchVillas';
import '../globals.css';

const SITE_NAME = 'Aquamarine';
const SITE_URL = 'https://aquamarine365.com';
const DEFAULT_TITLE = 'Aquamarine — Private Villas in Ayia Napa, Cyprus';
const DEFAULT_DESCRIPTION =
  'Owner-operated villas and seafront suites in Ayia Napa. Direct booking, no platform fees, on-island support 24/7.';

const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Aquamarine — private villas in Ayia Napa'
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s · Aquamarine' },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
    languages: { 'en-GB': '/', 'x-default': '/' }
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: 'en_GB',
    images: [DEFAULT_OG_IMAGE]
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url]
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

export default async function SiteLayout({ children }) {
  const villas = await getVillas();
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
      <VillasProvider villas={villas}>
        {children}
        <DeferredClient />
      </VillasProvider>
    </ThemeProvider>
  );
}
