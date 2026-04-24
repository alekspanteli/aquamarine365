import { cache } from 'react';
import type { DeepPartial, LegalPage, SiteSettings } from '@/types/domain';
import { defaultSiteSettings } from './defaults/siteSettings';
import { client } from './client';
import { cookiePageQuery, privacyPageQuery, siteSettingsQuery, termsPageQuery } from './queries';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeDeep<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (Array.isArray(base)) {
    return (override === undefined ? base : override) as T;
  }

  if (isPlainObject(base)) {
    const source = isPlainObject(override) ? override : {};

    return Object.fromEntries(
      Object.keys(base).map((key) => [
        key,
        mergeDeep(
          base[key as keyof T],
          source[key as keyof typeof source] as DeepPartial<T[keyof T]> | undefined
        )
      ])
    ) as T;
  }

  return (override ?? base) as T;
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await client.fetch<DeepPartial<SiteSettings>>(
    siteSettingsQuery,
    {},
    { next: { tags: ['site-settings'], revalidate: 60 } }
  );

  return mergeDeep(defaultSiteSettings, data ?? {});
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
