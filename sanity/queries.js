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

export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  "title": coalesce(title, siteName),
  siteUrl,
  seo{
    defaultTitle,
    defaultDescription,
    "ogImage": ogImage.asset->url
  },
  nav{
    items,
    searchPlaceholder,
    primaryCtaLabel
  },
  contact{
    phone,
    email,
    whatsappUrl,
    instagramUrl,
    addressLines
  },
  footer{
    tagline,
    trustItems
  },
  hero{
    eyebrow,
    headingLine1,
    headingLine2,
    body,
    primaryCtaLabel,
    secondaryCtaLabel,
    "image": image.asset->url,
    imageAlt,
    stats
  },
  stays{
    eyebrow,
    title,
    highlight
  },
  clarity{
    eyebrow,
    title,
    highlight,
    titleSuffix,
    body,
    pills,
    "image": image.asset->url,
    imageAlt,
    availabilityLabel,
    availabilityText
  },
  whyUs,
  compare,
  howItWorks,
  testimonials,
  faq,
  offer,
  organization
}`;

const LEGAL_PAGE_PROJECTION = `
  title,
  description,
  eyebrow,
  headline,
  intro,
  body,
  _updatedAt
`;

export const privacyPageQuery = groq`*[_type == "privacyPage" && _id == "privacyPage"][0]{ ${LEGAL_PAGE_PROJECTION} }`;
export const cookiePageQuery = groq`*[_type == "cookiePage" && _id == "cookiePage"][0]{ ${LEGAL_PAGE_PROJECTION} }`;
export const termsPageQuery = groq`*[_type == "termsPage" && _id == "termsPage"][0]{ ${LEGAL_PAGE_PROJECTION} }`;
