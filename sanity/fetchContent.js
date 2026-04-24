import { client } from './client';
import {
  siteSettingsQuery,
  privacyPageQuery,
  cookiePageQuery,
  termsPageQuery
} from './queries';
import { defaultSiteSettings } from './defaults/siteSettings';

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeDeep(base, override) {
  if (Array.isArray(base)) {
    return override === undefined ? base : override;
  }

  if (isObject(base)) {
    const source = isObject(override) ? override : {};
    return Object.fromEntries(
      Object.keys(base).map((key) => [key, mergeDeep(base[key], source[key])])
    );
  }

  return override ?? base;
}

export async function getSiteSettings() {
  const data = await client.fetch(
    siteSettingsQuery,
    {},
    { next: { tags: ['site-settings'], revalidate: 60 } }
  );

  return mergeDeep(defaultSiteSettings, data ?? {});
}

function getLegalPage(query, tag) {
  return client.fetch(query, {}, { next: { tags: [tag], revalidate: 60 } });
}

export function getPrivacyPage() {
  return getLegalPage(privacyPageQuery, 'legal:privacy');
}

export function getCookiePage() {
  return getLegalPage(cookiePageQuery, 'legal:cookies');
}

export function getTermsPage() {
  return getLegalPage(termsPageQuery, 'legal:terms');
}
