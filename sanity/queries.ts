import { defineQuery } from 'next-sanity';

const IMAGE_PROJECTION = `{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "ref": @
}`;

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
  "cover": cover${IMAGE_PROJECTION},
  "gallery": gallery[]${IMAGE_PROJECTION},
  highlights,
  amenities,
  specs,
  location_area,
  coords
`;

export const allVillasQuery = defineQuery(
  `*[_type == "villa"] | order(coalesce(order, 999), name asc) { ${VILLA_PROJECTION} }`
);

export const villaBySlugQuery = defineQuery(
  `*[_type == "villa" && slug.current == $slug][0] { ${VILLA_PROJECTION} }`
);

export const villaSlugsQuery = defineQuery(
  `*[_type == "villa" && defined(slug.current)][].slug.current`
);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  "title": coalesce(title, siteName),
  siteUrl,
  seo{
    defaultTitle,
    defaultDescription,
    "ogImage": ogImage${IMAGE_PROJECTION}
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
    "image": image${IMAGE_PROJECTION},
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
    "image": image${IMAGE_PROJECTION},
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
}`);

const LEGAL_PAGE_PROJECTION = `
  title,
  description,
  eyebrow,
  headline,
  intro,
  body,
  _updatedAt
`;

export const privacyPageQuery = defineQuery(
  `*[_type == "privacyPage" && _id == "privacyPage"][0]{ ${LEGAL_PAGE_PROJECTION} }`
);
export const cookiePageQuery = defineQuery(
  `*[_type == "cookiePage" && _id == "cookiePage"][0]{ ${LEGAL_PAGE_PROJECTION} }`
);
export const termsPageQuery = defineQuery(
  `*[_type == "termsPage" && _id == "termsPage"][0]{ ${LEGAL_PAGE_PROJECTION} }`
);
