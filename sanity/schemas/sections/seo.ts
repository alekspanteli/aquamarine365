import { defineType, defineField } from 'sanity';

export const seoSection = defineType({
  name: 'seoSection',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'defaultTitle',
      type: 'string',
      validation: (R) => R.required()
    }),
    defineField({
      name: 'defaultDescription',
      type: 'text',
      rows: 3,
      validation: (R) => R.required()
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'imageWithAlt'
    })
  ]
});
