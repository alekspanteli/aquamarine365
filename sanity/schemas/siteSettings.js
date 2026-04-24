import { studioSiteSettingsInitialValue } from '../defaults/siteSettings';

const textArrayField = (name, title) => ({
  name,
  title,
  type: 'array',
  of: [{ type: 'string' }]
});

const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  initialValue: studioSiteSettingsInitialValue,
  fields: [
    { name: 'title', title: 'Site Name', type: 'string', validation: (R) => R.required() },
    { name: 'siteUrl', type: 'url', validation: (R) => R.required() },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'defaultTitle', type: 'string', validation: (R) => R.required() },
        { name: 'defaultDescription', type: 'text', rows: 3, validation: (R) => R.required() },
        { name: 'ogImage', title: 'Open Graph image', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'items',
          title: 'Navigation items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', validation: (R) => R.required() },
                { name: 'href', type: 'string', validation: (R) => R.required() }
              ],
              preview: { select: { title: 'label', subtitle: 'href' } }
            }
          ]
        },
        { name: 'searchPlaceholder', type: 'string' },
        { name: 'primaryCtaLabel', type: 'string' }
      ]
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        { name: 'phone', type: 'string', validation: (R) => R.required() },
        { name: 'email', type: 'string', validation: (R) => R.required() },
        { name: 'whatsappUrl', type: 'url' },
        { name: 'instagramUrl', type: 'url' },
        textArrayField('addressLines', 'Address lines')
      ]
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'tagline', type: 'text', rows: 2 },
        textArrayField('trustItems', 'Trust items')
      ]
    },
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'headingLine1', type: 'string', validation: (R) => R.required() },
        { name: 'headingLine2', type: 'string', validation: (R) => R.required() },
        { name: 'body', type: 'text', rows: 4, validation: (R) => R.required() },
        { name: 'primaryCtaLabel', type: 'string' },
        { name: 'secondaryCtaLabel', type: 'string' },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string' },
        {
          name: 'stats',
          title: 'Hero stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', validation: (R) => R.required() },
                { name: 'label', type: 'string', validation: (R) => R.required() }
              ],
              preview: { select: { title: 'value', subtitle: 'label' } }
            }
          ]
        }
      ]
    },
    {
      name: 'stays',
      title: 'Stays section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' }
      ]
    },
    {
      name: 'clarity',
      title: 'Clarity section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' },
        { name: 'titleSuffix', type: 'string' },
        { name: 'body', type: 'text', rows: 4 },
        textArrayField('pills', 'Pills'),
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string' },
        { name: 'availabilityLabel', type: 'string' },
        { name: 'availabilityText', type: 'string' }
      ]
    },
    {
      name: 'whyUs',
      title: 'Why Us section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
        {
          name: 'reasons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'number', type: 'string', validation: (R) => R.required() },
                { name: 'title', type: 'string', validation: (R) => R.required() },
                { name: 'description', type: 'text', rows: 3, validation: (R) => R.required() }
              ],
              preview: { select: { title: 'title', subtitle: 'description' } }
            }
          ]
        }
      ]
    },
    {
      name: 'compare',
      title: 'Comparison section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
        {
          name: 'rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', validation: (R) => R.required() },
                { name: 'direct', type: 'string', validation: (R) => R.required() },
                { name: 'other', type: 'string', validation: (R) => R.required() }
              ],
              preview: { select: { title: 'label', subtitle: 'direct' } }
            }
          ]
        }
      ]
    },
    {
      name: 'howItWorks',
      title: 'How It Works section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' },
        {
          name: 'steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'number', type: 'string', validation: (R) => R.required() },
                { name: 'title', type: 'string', validation: (R) => R.required() },
                { name: 'description', type: 'text', rows: 3, validation: (R) => R.required() }
              ],
              preview: { select: { title: 'title', subtitle: 'description' } }
            }
          ]
        }
      ]
    },
    {
      name: 'testimonials',
      title: 'Testimonials section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' },
        {
          name: 'quotes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'quote', type: 'text', rows: 4, validation: (R) => R.required() },
                { name: 'name', type: 'string', validation: (R) => R.required() },
                { name: 'meta', type: 'string', validation: (R) => R.required() }
              ],
              preview: { select: { title: 'name', subtitle: 'meta' } }
            }
          ]
        },
        {
          name: 'trustStats',
          title: 'Trust stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', validation: (R) => R.required() },
                { name: 'value', type: 'string', validation: (R) => R.required() },
                { name: 'unit', type: 'string' }
              ],
              preview: { select: { title: 'label', subtitle: 'value' } }
            }
          ]
        },
        { name: 'locationsLabel', type: 'string' },
        textArrayField('cities', 'Cities')
      ]
    },
    {
      name: 'faq',
      title: 'FAQ section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'highlight', type: 'string' },
        {
          name: 'items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'question', type: 'string', validation: (R) => R.required() },
                { name: 'answer', type: 'text', rows: 4, validation: (R) => R.required() }
              ],
              preview: { select: { title: 'question', subtitle: 'answer' } }
            }
          ]
        }
      ]
    },
    {
      name: 'offer',
      title: 'Offer section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string' },
        { name: 'titleLine1', type: 'string' },
        { name: 'titleLine2', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'bodyPrefix', type: 'string' },
        { name: 'bodySuffix', type: 'text', rows: 3 },
        textArrayField('benefits', 'Benefits'),
        { name: 'submitLabel', type: 'string' },
        { name: 'successLabel', type: 'string' },
        { name: 'replyNote', type: 'string' }
      ]
    },
    {
      name: 'organization',
      title: 'Organization metadata',
      type: 'object',
      fields: [
        { name: 'legalName', type: 'string' },
        { name: 'priceRange', type: 'string' },
        { name: 'streetAddress', type: 'string' },
        { name: 'addressLocality', type: 'string' },
        { name: 'postalCode', type: 'string' },
        { name: 'addressCountry', type: 'string' },
        { name: 'ratingValue', type: 'string' },
        { name: 'reviewCount', type: 'string' },
        { name: 'bestRating', type: 'string' },
        { name: 'areaServed', type: 'string' }
      ]
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'siteUrl' }
  }
};

export default siteSettings;
