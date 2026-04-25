import { defineType, defineField } from 'sanity';

export const organizationSection = defineType({
  name: 'organizationSection',
  title: 'Organization metadata',
  type: 'object',
  fields: [
    defineField({ name: 'legalName', type: 'string' }),
    defineField({ name: 'priceRange', type: 'string' }),
    defineField({ name: 'streetAddress', type: 'string' }),
    defineField({ name: 'addressLocality', type: 'string' }),
    defineField({ name: 'postalCode', type: 'string' }),
    defineField({ name: 'addressCountry', type: 'string' }),
    defineField({ name: 'ratingValue', type: 'string' }),
    defineField({ name: 'reviewCount', type: 'string' }),
    defineField({ name: 'bestRating', type: 'string' }),
    defineField({ name: 'areaServed', type: 'string' })
  ]
});
