import { getVillaSlugs } from '@/sanity/fetchVillas';

const SITE = 'https://aquamarine365.com';

export default async function sitemap() {
  const now = new Date();
  const slugs = await getVillaSlugs();
  const staticRoutes = [
    { url: `${SITE}/`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${SITE}/legal/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${SITE}/legal/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${SITE}/legal/cookies`, priority: 0.3, changeFrequency: 'yearly' }
  ];
  const villaRoutes = slugs.map((slug) => ({
    url: `${SITE}/stays/${slug}`,
    priority: 0.9,
    changeFrequency: 'weekly'
  }));
  return [...staticRoutes, ...villaRoutes].map((r) => ({ ...r, lastModified: now }));
}
