import { defineType, defineField, defineArrayMember } from 'sanity';

export const footerSection = defineType({
  name: 'footerSection',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({ name: 'tagline', type: 'text', rows: 2 }),
    defineField({
      name: 'trustItems',
      title: 'Trust items',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    })
  ]
});
