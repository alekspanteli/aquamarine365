import { defineField, defineArrayMember, type FieldDefinition } from 'sanity';

export const legalFields: FieldDefinition[] = [
  defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
  defineField({ name: 'description', type: 'text', rows: 2, validation: (R) => R.required() }),
  defineField({ name: 'eyebrow', type: 'string', validation: (R) => R.required() }),
  defineField({ name: 'headline', type: 'string', validation: (R) => R.required() }),
  defineField({ name: 'intro', type: 'text', rows: 3, validation: (R) => R.required() }),
  defineField({
    name: 'body',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        // Legal copy is heading-2/3 only — no h1 (the page provides it),
        // no blockquote, no fancy decorators. Keeps the rendered prose
        // predictable and prevents editors from styling around the design.
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' }
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' }
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                defineField({
                  name: 'href',
                  type: 'url',
                  validation: (R) =>
                    R.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true })
                }),
                defineField({
                  name: 'newTab',
                  title: 'Open in new tab',
                  type: 'boolean',
                  initialValue: false
                })
              ]
            }
          ]
        }
      })
    ]
  })
];
