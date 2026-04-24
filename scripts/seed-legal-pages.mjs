import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import {
  defaultCookiePage,
  defaultPrivacyPage,
  defaultTermsPage
} from '../sanity/defaults/legalPages.js';
import { studioSiteSettingsInitialValue } from '../sanity/defaults/siteSettings.js';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const contents = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function isBlank(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function ensureArrayItemKeys(items, prefix) {
  if (!Array.isArray(items)) return { changed: false, value: items };

  let changed = false;
  const value = items.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return item;
    }

    if (typeof item._key === 'string' && item._key.trim().length > 0) {
      return item;
    }

    changed = true;
    return { ...item, _key: `${prefix}-${index + 1}` };
  });

  return { changed, value };
}

const envPath = path.resolve(process.cwd(), '.env.local');
loadEnvFile(envPath);

const projectId = process.env.SANITY_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing Sanity credentials. Expected project id, dataset, and SANITY_API_WRITE_TOKEN.'
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false
});

const documents = [
  { id: 'privacyPage', type: 'privacyPage', defaults: defaultPrivacyPage },
  { id: 'cookiePage', type: 'cookiePage', defaults: defaultCookiePage },
  { id: 'termsPage', type: 'termsPage', defaults: defaultTermsPage }
];

for (const document of documents) {
  const existing = await client.fetch('*[_id == $id][0]', { id: document.id });
  await client.createIfNotExists({ _id: document.id, _type: document.type });

  const updates = {};
  for (const [field, value] of Object.entries(document.defaults)) {
    if (isBlank(existing?.[field])) {
      updates[field] = value;
    }
  }

  if (Object.keys(updates).length > 0) {
    await client.patch(document.id).set(updates).commit({ autoGenerateArrayKeys: true });
    console.log(`Seeded ${document.id}: ${Object.keys(updates).join(', ')}`);
  } else {
    console.log(`Skipped ${document.id}: already populated`);
  }
}

const siteSettings = await client.fetch('*[_id == "siteSettings"][0]');
if (siteSettings) {
  const siteSettingsUpdates = {};
  const sectionArrayFixes = [
    { section: 'nav', arrayField: 'items', prefix: 'nav-item' },
    { section: 'hero', arrayField: 'stats', prefix: 'hero-stat' },
    { section: 'whyUs', arrayField: 'reasons', prefix: 'why-us-reason' },
    { section: 'compare', arrayField: 'rows', prefix: 'compare-row' },
    { section: 'howItWorks', arrayField: 'steps', prefix: 'how-step' },
    { section: 'testimonials', arrayField: 'quotes', prefix: 'testimonial-quote' },
    { section: 'testimonials', arrayField: 'trustStats', prefix: 'testimonial-stat' },
    { section: 'faq', arrayField: 'items', prefix: 'faq-item' }
  ];

  for (const fix of sectionArrayFixes) {
    const sectionValue = siteSettings[fix.section];
    if (!sectionValue || typeof sectionValue !== 'object') continue;

    const currentItems = sectionValue[fix.arrayField];
    const fallbackItems = studioSiteSettingsInitialValue[fix.section]?.[fix.arrayField];
    const sourceItems = Array.isArray(currentItems) && currentItems.length > 0 ? currentItems : fallbackItems;
    const { changed, value } = ensureArrayItemKeys(sourceItems, fix.prefix);

    if (changed) {
      siteSettingsUpdates[fix.section] = {
        ...(siteSettingsUpdates[fix.section] || sectionValue),
        [fix.arrayField]: value
      };
    }
  }

  if (Object.keys(siteSettingsUpdates).length > 0) {
    await client.patch('siteSettings').set(siteSettingsUpdates).commit();
    console.log(`Repaired siteSettings keys in: ${Object.keys(siteSettingsUpdates).join(', ')}`);
  } else {
    console.log('Skipped siteSettings key repair: all array items already have keys');
  }
}
