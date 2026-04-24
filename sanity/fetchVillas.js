import { client } from './client';
import { allVillasQuery, villaBySlugQuery, villaSlugsQuery } from './queries';

export function getVillas() {
  return client.fetch(allVillasQuery, {}, { next: { tags: ['villa'], revalidate: 60 } });
}

export function getVilla(slug) {
  return client.fetch(villaBySlugQuery, { slug }, { next: { tags: [`villa:${slug}`, 'villa'], revalidate: 60 } });
}

export function getVillaSlugs() {
  return client.fetch(villaSlugsQuery, {}, { next: { tags: ['villa'], revalidate: 60 } });
}
