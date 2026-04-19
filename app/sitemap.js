import { villas } from '@/data/villas';

const SITE = 'https://aquamarine365.com';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: `${SITE}/`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${SITE}/legal/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${SITE}/legal/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${SITE}/legal/cookies`, priority: 0.3, changeFrequency: 'yearly' }
  ];
  const villaRoutes = villas.map((v) => ({
    url: `${SITE}/stays/${v.slug}`,
    priority: 0.9,
    changeFrequency: 'weekly'
  }));
  return [...staticRoutes, ...villaRoutes].map((r) => ({ ...r, lastModified: now }));
}
