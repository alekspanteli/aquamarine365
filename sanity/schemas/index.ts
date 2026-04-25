import type { SchemaTypeDefinition } from 'sanity';
import { villa } from './villa';
import { siteSettings } from './siteSettings';
import { privacyPage } from './privacyPage';
import { cookiePage } from './cookiePage';
import { termsPage } from './termsPage';
import { imageWithAlt } from './imageWithAlt';
import { seoSection } from './sections/seo';
import { navSection } from './sections/nav';
import { contactSection } from './sections/contact';
import { footerSection } from './sections/footer';
import { heroSection } from './sections/hero';
import { staysSection } from './sections/stays';
import { claritySection } from './sections/clarity';
import { whyUsSection } from './sections/whyUs';
import { compareSection } from './sections/compare';
import { howItWorksSection } from './sections/howItWorks';
import { testimonialsSection } from './sections/testimonials';
import { faqSection } from './sections/faq';
import { offerSection } from './sections/offer';
import { organizationSection } from './sections/organization';

export const schemaTypes: SchemaTypeDefinition[] = [
  imageWithAlt,
  seoSection,
  navSection,
  contactSection,
  footerSection,
  heroSection,
  staysSection,
  claritySection,
  whyUsSection,
  compareSection,
  howItWorksSection,
  testimonialsSection,
  faqSection,
  offerSection,
  organizationSection,
  villa,
  siteSettings,
  privacyPage,
  cookiePage,
  termsPage
];
