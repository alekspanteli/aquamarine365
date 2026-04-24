#!/usr/bin/env node
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

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

async function uploadFromUrl(url, label) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${label}: HTTP ${res.status} fetching ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = (new URL(url).pathname.split('/').pop() || 'image') + '.jpg';
  const asset = await client.assets.upload('image', buffer, { filename });
  return asset._id;
}

function imageRef(assetId, withKey = false) {
  const ref = {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId }
  };
  if (withKey) ref._key = randomUUID().slice(0, 12);
  return ref;
}

const villas = await client.fetch(`*[_type == "villa"]{ _id, name, cover, gallery }`);
console.log(`Found ${villas.length} villas. Starting migration…\n`);

let migrated = 0;
let skipped = 0;
const failures = [];

for (const v of villas) {
  const patch = {};
  let coverChanges = 0;
  let galleryChanges = 0;

  try {
    if (typeof v.cover === 'string' && v.cover.startsWith('http')) {
      const assetId = await uploadFromUrl(v.cover, `${v.name} cover`);
      patch.cover = imageRef(assetId);
      coverChanges = 1;
    }

    if (Array.isArray(v.gallery) && v.gallery.some((g) => typeof g === 'string')) {
      const newGallery = [];
      for (const item of v.gallery) {
        if (typeof item === 'string' && item.startsWith('http')) {
          const assetId = await uploadFromUrl(item, `${v.name} gallery item`);
          newGallery.push(imageRef(assetId, true));
          galleryChanges++;
        } else if (item && typeof item === 'object') {
          newGallery.push(item._key ? item : { ...item, _key: randomUUID().slice(0, 12) });
        }
      }
      patch.gallery = newGallery;
    }

    if (Object.keys(patch).length === 0) {
      console.log(`  • Skipped "${v.name}" (already migrated)`);
      skipped++;
      continue;
    }

    await client.patch(v._id).set(patch).commit();
    console.log(`  ✓ Migrated "${v.name}" (cover: ${coverChanges}, gallery: ${galleryChanges})`);
    migrated++;
  } catch (err) {
    console.error(`  ✗ Failed "${v.name}": ${err.message}`);
    failures.push({ name: v.name, error: err.message });
  }
}

console.log(`\nDone. Migrated ${migrated}, skipped ${skipped}, failed ${failures.length}.`);
if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log(`  - ${f.name}: ${f.error}`);
  process.exit(1);
}
