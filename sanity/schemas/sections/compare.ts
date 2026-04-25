import { defineType, defineField, defineArrayMember } from 'sanity';

export const compareSection = defineType({
  name: 'compareSection',
  title: 'Comparison section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'highlight', type: 'string' }),
    defineField({ name: 'body', type: 'text', rows: 3 }),
    defineField({
      name: 'rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'direct', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'other', type: 'string', validation: (R) => R.required() })
          ],
          preview: { select: { title: 'label', subtitle: 'direct' } }
        })
      ]
    })
  ]
});
