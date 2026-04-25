import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import DeferredClient from '@/components/DeferredClient';
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { VillasProvider } from '@/components/VillasProvider';
import { DEFAULT_OG_IMAGE } from '@/sanity/defaults/siteSettings';
import { getSiteSettings } from '@/sanity/fetchContent';
import { getVillas } from '@/sanity/fetchVillas';
import { SanityLive } from '@/sanity/live';
import '../globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seo.defaultTitle;
  const description = settings.seo.defaultDescription;
  const ogImage = settings.seo.ogImage
    ? {
        ...DEFAULT_OG_IMAGE,
        url: settings.seo.ogImage.url,
        alt: settings.seo.ogImage.alt || DEFAULT_OG_IMAGE.alt
      }
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFDFE' },
    { media: '(prefers-color-scheme: dark)', color: '#061419' }
  ],
  width: 'device-width',
  initialScale: 1
};

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const [villas, settings] = await Promise.all([getVillas(), getSiteSettings()]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <SiteSettingsProvider settings={settings}>
        <VillasProvider villas={villas}>
          {children}
          <DeferredClient />
          <SanityLive />
        </VillasProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}
