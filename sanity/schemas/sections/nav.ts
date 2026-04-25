import { defineType, defineField, defineArrayMember } from 'sanity';

export const navSection = defineType({
  name: 'navSection',
  title: 'Navigation',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'href', type: 'string', validation: (R) => R.required() })
          ],
          preview: { select: { title: 'label', subtitle: 'href' } }
        })
      ]
    }),
    defineField({ name: 'searchPlaceholder', type: 'string' }),
    defineField({ name: 'primaryCtaLabel', type: 'string' })
  ]
});
