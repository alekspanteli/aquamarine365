const villa = {
  name: 'villa',
  title: 'Villa',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (R) => R.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (R) => R.required()
    },
    {
      name: 'tagline',
      type: 'string',
      validation: (R) => R.required().max(140)
    },
    {
      name: 'location',
      title: 'Short location label',
      description: 'Shown in cards. e.g. "Seafront · Ayia Napa"',
      type: 'string'
    },
    {
      name: 'sleeps',
      type: 'number',
      validation: (R) => R.required().integer().min(1)
    },
    {
      name: 'bedrooms',
      type: 'number',
      validation: (R) => R.required().integer().min(0)
    },
    {
      name: 'bathrooms',
      type: 'number',
      validation: (R) => R.required().integer().min(0)
    },
    {
      name: 'priceFrom',
      title: 'Price from (€ per night)',
      type: 'number',
      validation: (R) => R.required().min(0)
    },
    {
      name: 'summary',
      type: 'text',
      rows: 4,
      validation: (R) => R.required()
    },
    {
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required()
    },
    {
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      validation: (R) => R.required().min(1)
    },
    {
      name: 'highlights',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'amenities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'specs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', validation: (R) => R.required() },
            { name: 'value', type: 'string', validation: (R) => R.required() }
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' }
          }
        }
      ]
    },
    {
      name: 'location_area',
      title: 'Full location label',
      description: 'e.g. "Nissi Beach, Ayia Napa, Cyprus"',
      type: 'string'
    },
    {
      name: 'coords',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', validation: (R) => R.required() },
        { name: 'lng', type: 'number', validation: (R) => R.required() }
      ]
    },
    {
      name: 'order',
      title: 'Display order',
      description: 'Lower numbers appear first. Leave blank to sort alphabetically.',
      type: 'number'
    }
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
};

export default villa;
