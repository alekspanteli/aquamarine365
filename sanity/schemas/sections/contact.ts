import { defineType, defineField, defineArrayMember } from 'sanity';

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact',
  type: 'object',
  fields: [
    defineField({ name: 'phone', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'email', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'whatsappUrl', type: 'url' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({
      name: 'addressLines',
      title: 'Address lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    })
  ]
});
