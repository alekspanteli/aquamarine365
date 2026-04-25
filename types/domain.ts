export type Keyed<T> = T & { _key: string };

export type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export interface SanityImage {
  url: string;
  alt: string;
  lqip: string | null;
  width: number | null;
  height: number | null;
  ref: unknown | null;
}

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  ogImage: SanityImage | null;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ContactSettings {
  phone: string;
  email: string;
  whatsappUrl: string;
  instagramUrl: string;
  addressLines: string[];
}

export interface FooterSettings {
  tagline: string;
  trustItems: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroSettings {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  body: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  image: SanityImage;
  stats: Array<Keyed<HeroStat>>;
}

export interface StaysSettings {
  eyebrow: string;
  title: string;
  highlight: string;
}

export interface ClaritySettings {
  eyebrow: string;
  title: string;
  highlight: string;
  titleSuffix: string;
  body: string;
  pills: string[];
  image: SanityImage;
  availabilityLabel: string;
  availabilityText: string;
}

export interface WhyUsReason {
  number: string;
  title: string;
  description: string;
}

export interface WhyUsSettings {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  reasons: Array<Keyed<WhyUsReason>>;
}

export interface CompareRow {
  label: string;
  direct: string;
  other: string;
}

export interface CompareSettings {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  rows: Array<Keyed<CompareRow>>;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface HowItWorksSettings {
  eyebrow: string;
  title: string;
  highlight: string;
  steps: Array<Keyed<HowItWorksStep>>;
}

export interface TestimonialQuote {
  quote: string;
  name: string;
  meta: string;
}

export interface TrustStat {
  value: string;
  unit: string;
  label: string;
}

export interface TestimonialsSettings {
  eyebrow: string;
  title: string;
  highlight: string;
  quotes: Array<Keyed<TestimonialQuote>>;
  trustStats: Array<Keyed<TrustStat>>;
  locationsLabel: string;
  cities: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSettings {
  eyebrow: string;
  title: string;
  highlight: string;
  items: Array<Keyed<FaqItem>>;
}

export interface OfferSettings {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  code: string;
  bodyPrefix: string;
  bodySuffix: string;
  benefits: string[];
  submitLabel: string;
  successLabel: string;
  replyNote: string;
}

export interface OrganizationSettings {
  legalName: string;
  priceRange: string;
  addressCountry: string;
  addressLocality: string;
  postalCode: string;
  streetAddress: string;
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  areaServed: string;
}

export interface SiteSettings {
  title: string;
  siteUrl: string;
  seo: SeoSettings;
  nav: {
    items: Array<Keyed<NavItem>>;
    searchPlaceholder: string;
    primaryCtaLabel: string;
  };
  contact: ContactSettings;
  footer: FooterSettings;
  hero: HeroSettings;
  stays: StaysSettings;
  clarity: ClaritySettings;
  whyUs: WhyUsSettings;
  compare: CompareSettings;
  howItWorks: HowItWorksSettings;
  testimonials: TestimonialsSettings;
  faq: FaqSettings;
  offer: OfferSettings;
  organization: OrganizationSettings;
}

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface VillaSpec {
  label: string;
  value: string;
}

export interface VillaCoordinates {
  lat: number;
  lng: number;
}

export interface Villa {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  priceFrom: number;
  summary: string;
  cover: SanityImage;
  gallery: SanityImage[];
  highlights: string[];
  amenities: string[];
  specs: VillaSpec[];
  location_area: string | null;
  coords: VillaCoordinates | null;
}

export interface LegalPage {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  body: unknown[];
  _updatedAt: string;
}

export type MessageRole = 'assistant' | 'user';

export interface ChatActionLink {
  type: 'link';
  to: string;
  label: string;
  external?: boolean;
}

export interface ChatActionScroll {
  type: 'scroll';
  to: string;
  label: string;
}

export type ChatAction = ChatActionLink | ChatActionScroll;

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  action?: ChatAction;
}

export interface ChatReply {
  reply: string;
  action?: ChatAction;
}

export type QuizQuestionId = 'group' | 'vibe' | 'budget' | 'need';

export interface QuizOption {
  id: string;
  label: string;
  sub: string;
}

export interface QuizQuestion {
  id: QuizQuestionId;
  prompt: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizQuestionId, string>>;

export interface VillaRecommendation {
  winner: Villa;
  runnerUp: Villa;
  reason: string;
}
