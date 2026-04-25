import type { Keyed, OpenGraphImage, SanityImage, SiteSettings } from '@/types/domain';

function withKeys<T extends Record<string, unknown>>(prefix: string, items: T[]): Array<Keyed<T>> {
  return items.map((item, index) => ({
    _key: `${prefix}-${index + 1}`,
    ...item
  }));
}

function fallbackImage(url: string, alt: string): SanityImage {
  return { url, alt, lqip: null, width: null, height: null, ref: null };
}

export const defaultSiteSettings: SiteSettings = {
  title: 'Aquamarine',
  siteUrl: 'https://aquamarine365.com',
  seo: {
    defaultTitle: 'Aquamarine - Private Villas in Ayia Napa, Cyprus',
    defaultDescription:
      'Owner-operated villas and seafront suites in Ayia Napa. Direct booking, no platform fees, on-island support 24/7.',
    ogImage: null
  },
  nav: {
    items: withKeys('nav-item', [
      { href: '/#stays', label: 'Stays' },
      { href: '/#why', label: 'Why us' },
      { href: '/#how', label: 'How it works' },
      { href: '/#faq', label: 'FAQ' },
      { href: '/#contact', label: 'Contact' }
    ]),
    searchPlaceholder: 'Search villas, FAQs, contact...',
    primaryCtaLabel: 'Check availability'
  },
  contact: {
    phone: '+357 97 494 941',
    email: 'info@aquamarine365.com',
    whatsappUrl: 'https://wa.me/35797494941',
    instagramUrl: 'https://instagram.com',
    addressLines: ['61 Tefkrou Anthia', 'Ayia Napa 5330, Cyprus']
  },
  footer: {
    tagline: 'Ayia Napa villas & suites, managed by the people who own them.',
    trustItems: ['Licensed CY-DMT 2024', 'GDPR compliant', 'Secure payments - Stripe']
  },
  hero: {
    eyebrow: 'Ayia Napa - Cyprus',
    headingLine1: 'Private villas in Ayia Napa,',
    headingLine2: 'managed like a hotel.',
    body:
      'A small, owner-operated collection of seafront homes. Cleaned before every arrival, stocked on request, backed by a real team on the island 24/7. Book direct - no platform fees.',
    primaryCtaLabel: 'Check availability',
    secondaryCtaLabel: 'Or let us match you',
    image: fallbackImage(
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2400&q=70',
      'Seafront villa exterior in Ayia Napa'
    ),
    stats: withKeys('hero-stat', [
      { value: '4.9', label: 'Guest rating - 300+ stays' },
      { value: '12 yrs', label: 'Operating in Ayia Napa' },
      { value: '0%', label: 'Platform fees when direct' },
      { value: '24/7', label: 'On-island guest support' }
    ])
  },
  stays: {
    eyebrow: 'The homes',
    title: 'Three villas. All ours.',
    highlight: 'None resold.'
  },
  clarity: {
    eyebrow: 'What we do',
    title: 'We help travelers have',
    highlight: 'the best week',
    titleSuffix: 'of their year - in homes we actually run.',
    body:
      'Aquamarine owns and manages a small collection of villas and suites in Ayia Napa. We handle the property ourselves, so check-in is smooth, the place is spotless, and if anything is off, one person answers the phone and fixes it.',
    pills: [
      'Seafront & countryside',
      'Sleeps 2-10',
      '5-15 min to beach',
      'Long-stay rates'
    ],
    image: fallbackImage(
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=75',
      'Mediterranean villa with pool at dusk'
    ),
    availabilityLabel: 'Available this summer',
    availabilityText: '3 private villas - 19 beds total'
  },
  whyUs: {
    eyebrow: 'Why Aquamarine',
    title: 'Fewer surprises.',
    highlight: 'Better holidays.',
    body:
      "We do not resell other people's listings. We own the operation - which is why it actually works.",
    reasons: withKeys('why-us-reason', [
      {
        number: '01',
        title: 'We answer the phone.',
        description:
          'One local team, on the island, 24/7. Not an overseas call centre. Average response: under 10 minutes.'
      },
      {
        number: '02',
        title: 'No booking fees.',
        description:
          'Book direct and skip the 15-20% platform markup. Same homes, lower total, no checkout surprises.'
      },
      {
        number: '03',
        title: 'Hotel-grade turnover.',
        description:
          'Every villa runs through a 42-point checklist before you arrive. Linens, basics, Wi-Fi - verified, not assumed.'
      },
      {
        number: '04',
        title: 'We know Ayia Napa.',
        description:
          'Twelve years here. We will tell you which beach is quiet on a Saturday and which taverna is worth the drive.'
      }
    ])
  },
  compare: {
    eyebrow: 'The honest comparison',
    title: 'Book direct.',
    highlight: "Here's what changes.",
    body: 'Same villa either way. Different experience - and a different total at checkout.',
    rows: withKeys('compare-row', [
      { label: 'Booking fees', direct: 'EUR 0', other: 'EUR 120 - EUR 240' },
      { label: 'Who cleans', direct: 'Our local team', other: 'Third-party contractor' },
      { label: 'Who answers at 10pm', direct: 'A person on the island', other: 'Overseas chat bot' },
      { label: 'Cancellation', direct: 'Free to 30 days out', other: 'Strict, partial refund' },
      { label: 'Keys', direct: 'Code or hand-delivered', other: 'Often a lockbox' },
      { label: 'Fridge pre-stock', direct: 'On request, at cost', other: 'Not offered' },
      { label: 'Same night room switch', direct: 'Free when available', other: 'Not available' }
    ])
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Four steps.',
    highlight: "That's the whole thing.",
    steps: withKeys('how-step', [
      {
        number: '1',
        title: 'Tell us your dates',
        description:
          'Pick a villa or let us suggest one. We confirm availability within the hour.'
      },
      {
        number: '2',
        title: 'Lock it in',
        description:
          '30% holds the keys. Balance two weeks before arrival. Free cancel up to 30 days out.'
      },
      {
        number: '3',
        title: 'Arrive, walk in',
        description:
          'Self check-in with a code or meet us at the door. Transfer, stocking, chef bookable.'
      },
      {
        number: '4',
        title: 'Stay in touch',
        description:
          'One WhatsApp thread for the trip. Plumber, sitter, 9pm table? Message us.'
      }
    ])
  },
  testimonials: {
    eyebrow: 'What guests say',
    title: 'Real reviews from',
    highlight: 'real stays.',
    quotes: withKeys('testimonial-quote', [
      {
        quote:
          'Check-in took ninety seconds. The fridge had the groceries we asked for. The sea was fifty steps from the door. I do not know what else you want from a holiday.',
        name: 'Marta K.',
        meta: 'Stockholm - Ocean Dreams - 7 nights'
      },
      {
        quote:
          "Pool heater broke at 10pm. Someone turned up by 8am with a replacement part. That's the difference versus every other rental I have booked.",
        name: 'James R.',
        meta: 'London - Tropicana - 10 nights'
      },
      {
        quote:
          'Brought my parents, my sister, her kids and our dog. Five bathrooms, one bill, zero arguments. We are rebooking for next summer.',
        name: 'Elena D.',
        meta: 'Athens - Valerian Palm - 14 nights'
      },
      {
        quote:
          "They messaged me the morning of arrival with the forecast, a restaurant list, and a note that the road to the villa had fresh tarmac. That's hospitality.",
        name: 'Lucas M.',
        meta: 'Paris - Ocean Dreams - 5 nights'
      }
    ]),
    trustStats: withKeys('testimonial-stat', [
      { value: '4.9', unit: '/5', label: 'Average rating' },
      { value: '300', unit: '+', label: 'Stays hosted' },
      { value: '68', unit: '%', label: 'Return or referred' },
      { value: '12', unit: ' yrs', label: 'Operating in Ayia Napa' }
    ]),
    locationsLabel: 'Licensed CY-DMT - Booked this year from',
    cities: [
      'London',
      'Stockholm',
      'Paris',
      'Berlin',
      'Athens',
      'Milan',
      'Amsterdam',
      'Zurich',
      'Dublin',
      'Madrid',
      'Copenhagen',
      'Vienna'
    ]
  },
  faq: {
    eyebrow: 'Questions',
    title: 'The stuff',
    highlight: 'you were going to ask anyway.',
    items: withKeys('faq-item', [
      {
        question: 'Is booking direct actually cheaper?',
        answer:
          'Yes - you skip the platform service fee (typically 15-20%) and we do not mark up to absorb it. On a EUR 1,800 week, that is EUR 270+ back in your pocket.'
      },
      {
        question: 'What happens if something breaks during my stay?',
        answer:
          'Message us on WhatsApp. We are on the island, so the average fix-time is under two hours for anything that matters (A/C, Wi-Fi, hot water). Our average guest-message response is under 10 minutes.'
      },
      {
        question: 'Can I cancel if my plans change?',
        answer:
          'Free cancellation up to 30 days before arrival - full refund of your deposit. Inside 30 days, we refund whatever we can re-book for. No fine print.'
      },
      {
        question: 'Do you offer airport pickup?',
        answer:
          'Yes. LCA (Larnaca) is about 45 minutes by car. A transfer is EUR 65 one-way, EUR 110 round-trip. We can also arrange rental cars at local rates.'
      },
      {
        question: 'Are kids and pets okay?',
        answer:
          'Kids, always. Travel cots and high chairs on request at no charge. Dogs welcome at Valerian Palm (fully fenced garden). No pets at Ocean Dreams due to building rules.'
      },
      {
        question: 'How do payments work?',
        answer:
          '30% deposit holds the booking. Balance due two weeks before arrival. We use Stripe - all major cards, Apple Pay, Google Pay. No crypto, no wire transfers, no weird links.'
      }
    ])
  },
  offer: {
    eyebrow: 'Direct offer',
    titleLine1: 'Book direct.',
    titleLine2: 'Get the week for six.',
    code: 'DIRECT7',
    bodyPrefix: 'Mention code',
    bodySuffix:
      'when you enquire. Valid on stays of 7+ nights, May through October. No platform fees, ever.',
    benefits: [
      'One-hour reply, 8am-10pm Cyprus time',
      '30% deposit - free cancellation 30 days out',
      'Airport pickup & grocery stocking on request'
    ],
    submitLabel: 'Check my dates',
    successLabel: 'Enquiry sent - check your inbox',
    replyNote: 'We reply within one hour, 8am-10pm Cyprus time.'
  },
  organization: {
    legalName: 'Aquamarine Holiday Rentals',
    priceRange: 'EUR',
    addressCountry: 'CY',
    addressLocality: 'Ayia Napa',
    postalCode: '5330',
    streetAddress: '61 Tefkrou Anthia',
    ratingValue: '4.9',
    reviewCount: '300',
    bestRating: '5',
    areaServed: 'Ayia Napa, Cyprus'
  }
};

// Studio gets defaults without preset image references so editors upload
// real assets rather than inheriting Unsplash placeholder URLs.
const { ogImage: _ogImage, ...seoInitialValue } = defaultSiteSettings.seo;
const { image: _heroImage, ...heroInitialValue } = defaultSiteSettings.hero;
const { image: _clarityImage, ...clarityInitialValue } = defaultSiteSettings.clarity;

export const studioSiteSettingsInitialValue = {
  ...defaultSiteSettings,
  seo: seoInitialValue,
  hero: heroInitialValue,
  clarity: clarityInitialValue
};

export const DEFAULT_OG_IMAGE: OpenGraphImage = {
  url: '/opengraph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Aquamarine - private villas in Ayia Napa'
};
