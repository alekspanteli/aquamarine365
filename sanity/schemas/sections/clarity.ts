import { defineType, defineField, defineArrayMember } from 'sanity';

export const claritySection = defineType({
  name: 'claritySection',
  title: 'Clarity section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'highlight', type: 'string' }),
    defineField({ name: 'titleSuffix', type: 'string' }),
    defineField({ name: 'body', type: 'text', rows: 4 }),
    defineField({
      name: 'pills',
      title: 'Pills',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'image', type: 'imageWithAlt' }),
    defineField({ name: 'availabilityLabel', type: 'string' }),
    defineField({ name: 'availabilityText', type: 'string' })
  ]
});
