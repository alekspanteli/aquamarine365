import { defineType, defineField, defineArrayMember } from 'sanity';

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'highlight', type: 'string' }),
    defineField({
      name: 'quotes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'quote', type: 'text', rows: 4, validation: (R) => R.required() }),
            defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'meta', type: 'string', validation: (R) => R.required() })
          ],
          preview: { select: { title: 'name', subtitle: 'meta' } }
        })
      ]
    }),
    defineField({
      name: 'trustStats',
      title: 'Trust stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'value', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'unit', type: 'string' })
          ],
          preview: { select: { title: 'label', subtitle: 'value' } }
        })
      ]
    }),
    defineField({ name: 'locationsLabel', type: 'string' }),
    defineField({
      name: 'cities',
      title: 'Cities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    })
  ]
});
