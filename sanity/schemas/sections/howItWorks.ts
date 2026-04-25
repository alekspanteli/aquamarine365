import { defineType, defineField, defineArrayMember } from 'sanity';

export const howItWorksSection = defineType({
  name: 'howItWorksSection',
  title: 'How It Works section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'highlight', type: 'string' }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'number', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'description', type: 'text', rows: 3, validation: (R) => R.required() })
          ],
          preview: { select: { title: 'title', subtitle: 'description' } }
        })
      ]
    })
  ]
});
