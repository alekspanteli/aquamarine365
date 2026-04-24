export const legalFields = [
  { name: 'title', type: 'string', validation: (R) => R.required() },
  { name: 'description', type: 'text', rows: 2, validation: (R) => R.required() },
  { name: 'eyebrow', type: 'string', validation: (R) => R.required() },
  { name: 'headline', type: 'string', validation: (R) => R.required() },
  { name: 'intro', type: 'text', rows: 3, validation: (R) => R.required() },
  {
    name: 'body',
    type: 'array',
    of: [{ type: 'block' }]
  }
];
