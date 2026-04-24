#!/usr/bin/env node
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

for (const line of readFileSync(resolve(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_API_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_API_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
if (!token) throw new Error('Missing SANITY_API_WRITE_TOKEN in .env.local');

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false
});

const { villas } = await import(pathToFileURL(resolve(root, 'data/villas.js')).href);

const docs = villas.map((v, i) => ({
  _id: `villa-${v.slug}`,
  _type: 'villa',
  name: v.name,
  slug: { _type: 'slug', current: v.slug },
  tagline: v.tagline,
  location: v.location,
  sleeps: v.sleeps,
  bedrooms: v.bedrooms,
  bathrooms: v.bathrooms,
  priceFrom: v.priceFrom,
  summary: v.summary,
  cover: v.cover,
  gallery: v.gallery,
  highlights: v.highlights,
  amenities: v.amenities,
  specs: (v.specs || []).map((s, j) => ({ _key: `spec-${j}`, ...s })),
  location_area: v.location_area,
  coords: v.coords ? { lat: v.coords.lat, lng: v.coords.lng } : undefined,
  order: i
}));

console.log(`Importing ${docs.length} villas into ${projectId}/${dataset}…`);

const tx = client.transaction();
for (const doc of docs) tx.createOrReplace(doc);
const res = await tx.commit();

console.log(`Done. ${res.results.length} documents written:`);
for (const r of res.results) console.log(`  - ${r.id}`);
