import { defineType, defineField, defineArrayMember } from 'sanity';

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'highlight', type: 'string' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'answer', type: 'text', rows: 4, validation: (R) => R.required() })
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } }
        })
      ]
    })
  ]
});
