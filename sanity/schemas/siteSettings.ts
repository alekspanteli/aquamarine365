import { defineType, defineField } from 'sanity';
import { studioSiteSettingsInitialValue } from '../defaults/siteSettings';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  initialValue: studioSiteSettingsInitialValue,
  fields: [
    defineField({ name: 'title', title: 'Site Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'siteUrl', type: 'url', validation: (R) => R.required() }),
    defineField({ name: 'seo', type: 'seoSection' }),
    defineField({ name: 'nav', type: 'navSection' }),
    defineField({ name: 'contact', type: 'contactSection' }),
    defineField({ name: 'footer', type: 'footerSection' }),
    defineField({ name: 'hero', type: 'heroSection' }),
    defineField({ name: 'stays', type: 'staysSection' }),
    defineField({ name: 'clarity', type: 'claritySection' }),
    defineField({ name: 'whyUs', type: 'whyUsSection' }),
    defineField({ name: 'compare', type: 'compareSection' }),
    defineField({ name: 'howItWorks', type: 'howItWorksSection' }),
    defineField({ name: 'testimonials', type: 'testimonialsSection' }),
    defineField({ name: 'faq', type: 'faqSection' }),
    defineField({ name: 'offer', type: 'offerSection' }),
    defineField({ name: 'organization', type: 'organizationSection' })
  ],
  preview: {
    select: { title: 'title', subtitle: 'siteUrl' }
  }
});

export default siteSettings;
