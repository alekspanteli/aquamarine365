import { cache } from 'react';
import type { LegalPage, SiteSettings } from '@/types/domain';
import { defaultSiteSettings } from './defaults/siteSettings';
import { client } from './client';
import { cookiePageQuery, privacyPageQuery, siteSettingsQuery, termsPageQuery } from './queries';

type IncomingSettings = Partial<SiteSettings> | null;

// Drop keys whose value is null/undefined so a missing CMS field doesn't
// blow away its default. GROQ projections return null for empty image
// objects, which would otherwise propagate through the spread.
function pickDefined<T extends object>(obj: T | undefined | null): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
  ) as Partial<T>;
}

// Section-level fallback: if Sanity returns the doc but a section is empty,
// fall through to the default. Validation rules in the schema mean each
// individual field within a populated section is already required.
function withFallback(data: IncomingSettings): SiteSettings {
  if (!data) return defaultSiteSettings;
  return {
    ...defaultSiteSettings,
    ...pickDefined(data),
    seo: { ...defaultSiteSettings.seo, ...pickDefined(data.seo) },
    nav: { ...defaultSiteSettings.nav, ...pickDefined(data.nav) },
    contact: { ...defaultSiteSettings.contact, ...pickDefined(data.contact) },
    footer: { ...defaultSiteSettings.footer, ...pickDefined(data.footer) },
    hero: { ...defaultSiteSettings.hero, ...pickDefined(data.hero) },
    stays: { ...defaultSiteSettings.stays, ...pickDefined(data.stays) },
    clarity: { ...defaultSiteSettings.clarity, ...pickDefined(data.clarity) },
    whyUs: { ...defaultSiteSettings.whyUs, ...pickDefined(data.whyUs) },
    compare: { ...defaultSiteSettings.compare, ...pickDefined(data.compare) },
    howItWorks: { ...defaultSiteSettings.howItWorks, ...pickDefined(data.howItWorks) },
    testimonials: { ...defaultSiteSettings.testimonials, ...pickDefined(data.testimonials) },
    faq: { ...defaultSiteSettings.faq, ...pickDefined(data.faq) },
    offer: { ...defaultSiteSettings.offer, ...pickDefined(data.offer) },
    organization: { ...defaultSiteSettings.organization, ...pickDefined(data.organization) }
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await client.fetch<IncomingSettings>(
    siteSettingsQuery,
    {},
    { next: { tags: ['site-settings'], revalidate: 60 } }
  );
  return withFallback(data);
});

export const getPrivacyPage = cache(async (): Promise<LegalPage | null> => {
  return client.fetch<LegalPage | null>(
    privacyPageQuery,
    {},
    { next: { tags: ['legal:privacy'], revalidate: 60 } }
  );
});

export const getCookiePage = cache(async (): Promise<LegalPage | null> => {
  return client.fetch<LegalPage | null>(
    cookiePageQuery,
    {},
    { next: { tags: ['legal:cookies'], revalidate: 60 } }
  );
});

export const getTermsPage = cache(async (): Promise<LegalPage | null> => {
  return client.fetch<LegalPage | null>(
    termsPageQuery,
    {},
    { next: { tags: ['legal:terms'], revalidate: 60 } }
  );
});
