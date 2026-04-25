import { defineType, defineField, defineArrayMember } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'headingLine1', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'headingLine2', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'body', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'primaryCtaLabel', type: 'string' }),
    defineField({ name: 'secondaryCtaLabel', type: 'string' }),
    defineField({ name: 'image', type: 'imageWithAlt' }),
    defineField({
      name: 'stats',
      title: 'Hero stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'label', type: 'string', validation: (R) => R.required() })
          ],
          preview: { select: { title: 'value', subtitle: 'label' } }
        })
      ]
    })
  ]
});
