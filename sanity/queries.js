import { groq } from 'next-sanity';

const VILLA_PROJECTION = `
  _id,
  name,
  "slug": slug.current,
  tagline,
  location,
  sleeps,
  bedrooms,
  bathrooms,
  priceFrom,
  summary,
  "cover": cover.asset->url,
  "gallery": gallery[].asset->url,
  highlights,
  amenities,
  specs,
  location_area,
  coords
`;

export const allVillasQuery = groq`*[_type == "villa"] | order(coalesce(order, 999), name asc) { ${VILLA_PROJECTION} }`;

export const villaBySlugQuery = groq`*[_type == "villa" && slug.current == $slug][0] { ${VILLA_PROJECTION} }`;

export const villaSlugsQuery = groq`*[_type == "villa" && defined(slug.current)][].slug.current`;
