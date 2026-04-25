import { defineType, defineField } from 'sanity';

export const staysSection = defineType({
  name: 'staysSection',
  title: 'Stays section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'highlight', type: 'string' })
  ]
});
