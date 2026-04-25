import { defineType, defineField, defineArrayMember } from 'sanity';

export const offerSection = defineType({
  name: 'offerSection',
  title: 'Offer section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'titleLine1', type: 'string' }),
    defineField({ name: 'titleLine2', type: 'string' }),
    defineField({ name: 'code', type: 'string' }),
    defineField({ name: 'bodyPrefix', type: 'string' }),
    defineField({ name: 'bodySuffix', type: 'text', rows: 3 }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'submitLabel', type: 'string' }),
    defineField({ name: 'successLabel', type: 'string' }),
    defineField({ name: 'replyNote', type: 'string' })
  ]
});
