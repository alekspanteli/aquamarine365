import { defineType, defineField, defineArrayMember } from 'sanity';

export const villa = defineType({
  name: 'villa',
  title: 'Villa',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (R) => R.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (R) => R.required()
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      validation: (R) => R.required().max(140)
    }),
    defineField({
      name: 'location',
      title: 'Short location label',
      description: 'Shown in cards. e.g. "Seafront · Ayia Napa"',
      type: 'string'
    }),
    defineField({
      name: 'sleeps',
      type: 'number',
      validation: (R) => R.required().integer().min(1)
    }),
    defineField({
      name: 'bedrooms',
      type: 'number',
      validation: (R) => R.required().integer().min(0)
    }),
    defineField({
      name: 'bathrooms',
      type: 'number',
      validation: (R) => R.required().integer().min(0)
    }),
    defineField({
      name: 'priceFrom',
      title: 'Price from (€ per night)',
      type: 'number',
      validation: (R) => R.required().min(0)
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 4,
      validation: (R) => R.required()
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'imageWithAlt',
      validation: (R) => R.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      options: { layout: 'grid' },
      validation: (R) => R.required().min(1)
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'amenities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'specs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'value', type: 'string', validation: (R) => R.required() })
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' }
          }
        })
      ]
    }),
    defineField({
      name: 'location_area',
      title: 'Full location label',
      description: 'e.g. "Nissi Beach, Ayia Napa, Cyprus"',
      type: 'string'
    }),
    defineField({
      name: 'coords',
      type: 'object',
      fields: [
        defineField({ name: 'lat', type: 'number', validation: (R) => R.required() }),
        defineField({ name: 'lng', type: 'number', validation: (R) => R.required() })
      ]
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      description: 'Lower numbers appear first. Leave blank to sort alphabetically.',
      type: 'number'
    })
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' }
  }
});

export default villa;
