import { ThemeProvider } from '@/components/ThemeProvider';
import DeferredClient from '@/components/DeferredClient';
import { VillasProvider } from '@/components/VillasProvider';
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider';
import { getVillas } from '@/sanity/fetchVillas';
import { getSiteSettings } from '@/sanity/fetchContent';
import { DEFAULT_OG_IMAGE } from '@/sanity/defaults/siteSettings';
import '../globals.css';

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const title = settings.seo.defaultTitle;
  const description = settings.seo.defaultDescription;
  const ogImage = settings.seo.ogImage
    ? { ...DEFAULT_OG_IMAGE, url: settings.seo.ogImage }
    : DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(settings.siteUrl),
    title: { default: title, template: `%s | ${settings.title}` },
    description,
    applicationName: settings.title,
    alternates: {
      canonical: '/',
      languages: { 'en-GB': '/', 'x-default': '/' }
    },
    openGraph: {
      type: 'website',
      siteName: settings.title,
      url: settings.siteUrl,
      title,
      description,
      locale: 'en_GB',
      images: [ogImage]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url]
    },
    robots: { index: true, follow: true }
  };
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFDFE' },
    { media: '(prefers-color-scheme: dark)', color: '#061419' }
  ],
  width: 'device-width',
  initialScale: 1
};

export default async function SiteLayout({ children }) {
  const [villas, settings] = await Promise.all([getVillas(), getSiteSettings()]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
      <SiteSettingsProvider settings={settings}>
        <VillasProvider villas={villas}>
          {children}
          <DeferredClient />
        </VillasProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}
