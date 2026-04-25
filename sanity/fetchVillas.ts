import { cache } from 'react';
import type { Villa } from '@/types/domain';
import { client } from './client';
import { allVillasQuery, villaBySlugQuery, villaSlugsQuery } from './queries';

type RawVilla = Omit<Villa, 'gallery' | 'highlights' | 'amenities' | 'specs' | 'location_area' | 'coords'> & {
  gallery?: Villa['gallery'] | null;
  highlights?: string[] | null;
  amenities?: string[] | null;
  specs?: Villa['specs'] | null;
  location_area?: string | null;
  coords?: Villa['coords'];
};

function normalizeVilla(villa: RawVilla): Villa {
  return {
    ...villa,
    gallery: villa.gallery ?? [],
    highlights: villa.highlights ?? [],
    amenities: villa.amenities ?? [],
    specs: villa.specs ?? [],
    location_area: villa.location_area ?? null,
    coords: villa.coords ?? null
  };
}

export const getVillas = cache(async (): Promise<Villa[]> => {
  const villas = await client.fetch<RawVilla[]>(
    allVillasQuery,
    {},
    { next: { tags: ['villa'], revalidate: 60 } }
  );

  return villas.map(normalizeVilla);
});

export const getVilla = cache(async (slug: string): Promise<Villa | null> => {
  const villa = await client.fetch<RawVilla | null>(
    villaBySlugQuery,
    { slug },
    { next: { tags: [`villa:${slug}`, 'villa'], revalidate: 60 } }
  );

  return villa ? normalizeVilla(villa) : null;
});

export const getVillaSlugs = cache(async (): Promise<string[]> => {
  return client.fetch<string[]>(
    villaSlugsQuery,
    {},
    { next: { tags: ['villa'], revalidate: 60 } }
  );
});
