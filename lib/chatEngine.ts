import type { ChatReply, Villa } from '@/types/domain';

interface FaqEntry {
  match: string[];
  reply: string;
}

const FAQ: FaqEntry[] = [
  {
    match: [
      'cheaper',
      'discount',
      'save',
      'cost less',
      'why direct',
      'platform fee',
      'airbnb fee',
      'direct cheap'
    ],
    reply:
      "Yes - booking direct skips the 15-20% platform service fee, and we don't mark up to absorb it. On a EUR 1,800 week that's EUR 270+ back in your pocket. No hidden cleaning charge at checkout either."
  },
  {
    match: [
      'broken',
      'break',
      'emergency',
      'problem',
      'support',
      'help during',
      'something wrong',
      'ac not working',
      'wifi down'
    ],
    reply:
      "Message us on WhatsApp - we're on the island, so most fixes happen within two hours (A/C, Wi-Fi, hot water). Average message response: under 10 minutes, 8am-10pm Cyprus time. +357 97 494 941."
  },
  {
    match: ['cancel', 'refund', 'change my mind', 'cancellation', 'cancellation policy'],
    reply:
      'Free cancellation up to **30 days** before arrival - full deposit refund. Inside 30 days, we refund whatever we can re-book for. No fine print.'
  },
  {
    match: ['airport', 'transfer', 'pickup', 'pick up', 'lca', 'larnaca', 'getting there', 'from airport'],
    reply:
      'LCA (Larnaca airport) is about 45 minutes by car. We arrange transfer at EUR 65 one-way or EUR 110 round-trip. Rental cars at local rates on request.'
  },
  {
    match: ['pet', 'dog', 'cat', 'pets allowed', 'pet friendly'],
    reply:
      'Dogs are welcome at **Valerian Palm Villa** (fully fenced garden). Sorry, no pets at Ocean Dreams or Tropicana due to building rules.'
  },
  {
    match: ['kid', 'child', 'baby', 'cot', 'high chair', 'family', 'children'],
    reply:
      'Kids always welcome. Travel cots and high chairs on request at no extra charge. Valerian Palm has a fully-fenced garden - popular with families.'
  },
  {
    match: ['pay', 'payment', 'deposit', 'how do i pay', 'stripe', 'credit card', 'apple pay', 'google pay', 'crypto'],
    reply:
      '30% deposit holds your booking. Balance is due 2 weeks before arrival. We use Stripe - all major cards, Apple Pay, Google Pay. No crypto, no wire transfers.'
  },
  {
    match: ['code', 'discount code', 'direct7', 'promo', 'offer', 'free night'],
    reply:
      'Mention **DIRECT7** when you enquire - on stays of 7+ nights May through October, you get the week for the price of six nights. No platform fees, ever.'
  },
  {
    match: ['contact', 'phone', 'whatsapp', 'call', 'email', 'reach you', 'address'],
    reply:
      'WhatsApp or call **+357 97 494 941** - email **info@aquamarine365.com**. We reply within the hour, 8am-10pm Cyprus time. Office: 61 Tefkrou Anthia, Ayia Napa 5330.'
  },
  {
    match: ['licensed', 'regulated', 'trust', 'legit', 'legitimate', 'scam'],
    reply:
      'Licensed by the Cyprus Deputy Ministry of Tourism (CY-DMT). Twelve years operating in Ayia Napa, 300+ stays, 4.9/5 average rating, 68% return or referred guests.'
  }
];

const INTENTS = [
  {
    test: (question: string) =>
      /\b(book|reserve|reservation|enquire|inquire|enquiry|availability|check\s+date)/i.test(
        question
      ),
    reply: () =>
      "Easiest way to check dates is the **Check availability** form - I'll scroll you there. Or WhatsApp +357 97 494 941 and the team will reply within the hour.",
    action: { type: 'scroll', to: '#book', label: 'Open booking form' } as const
  },
  {
    test: (question: string) =>
      /\b(hi|hey|hello|hola|yo|good\s+(morning|afternoon|evening))\b/i.test(question.trim()),
    reply: () =>
      "Hi! I can answer questions about our three villas in Ayia Napa - prices, what's included, how booking works. What are you looking for?"
  },
  {
    test: (question: string) => /\b(thank|thanks|cheers|ta|appreciate)/i.test(question),
    reply: () => 'Anytime. If you want a human next, ping us on WhatsApp: +357 97 494 941.'
  },
  {
    test: (question: string) =>
      /\b(who\s+are\s+you|what\s+is\s+aquamarine|about\s+you|tell\s+me\s+about)/i.test(question),
    reply: () =>
      "Aquamarine is an owner-operated collection of three private villas and suites in Ayia Napa, Cyprus. We manage everything ourselves - cleaning, check-in, 24/7 support - so you skip the platform fees and get one team on the island."
  }
];

function priceIntent(question: string, villas: Villa[]): ChatReply | null {
  if (!/\b(price|cost|rate|how\s+much|per\s+night|nightly)\b/i.test(question)) {
    return null;
  }

  const villa = findVilla(question, villas);

  if (villa) {
    return {
      reply: `**${villa.name}** starts from **EUR ${villa.priceFrom}/night**. Rates vary by season - book 7+ nights May-October with code DIRECT7 and you get the week for six nights' price.`,
      action: { type: 'link', to: `/stays/${villa.slug}`, label: `View ${villa.name}` }
    };
  }

  const list = villas
    .map((candidate) => `- **${candidate.name}** - sleeps ${candidate.sleeps}, from **EUR ${candidate.priceFrom}/night**`)
    .join('\n');

  return {
    reply: `Here's the line-up:\n\n${list}\n\nDiscount code **DIRECT7** drops week-long stays to six-night pricing (May-Oct).`
  };
}

function amenityIntent(question: string, villas: Villa[]): ChatReply | null {
  const hit =
    /\b(pool|beach|sea\s*view|wifi|internet|ac|air\s*cond|kitchen|bbq|parking|cot|view|terrace|garden|washer)/i;
  if (!hit.test(question)) {
    return null;
  }

  const villa = findVilla(question, villas);
  const term = question.match(hit)?.[0]?.toLowerCase() ?? '';

  if (villa) {
    const matches = [...villa.amenities, ...villa.highlights]
      .filter((item) => item.toLowerCase().includes(term.split(/\s+/)[0]))
      .slice(0, 3);

    if (matches.length) {
      return {
        reply: `**${villa.name}** has:\n${matches.map((item) => `- ${item.replace(/&amp;/g, '&')}`).join('\n')}`,
        action: { type: 'link', to: `/stays/${villa.slug}`, label: 'See all amenities' }
      };
    }
  }

  const matchingVillas = villas.filter((candidate) =>
    [...candidate.amenities, ...candidate.highlights].some((item) =>
      item.toLowerCase().includes(term.split(/\s+/)[0])
    )
  );

  if (!matchingVillas.length) {
    return null;
  }

  return {
    reply: `Villas with ${term}: ${matchingVillas.map((candidate) => `**${candidate.name}**`).join(', ')}. Want details on one?`
  };
}

function capacityIntent(question: string, villas: Villa[]): ChatReply | null {
  const match = question.match(
    /\b(\d{1,2})\s*(people|guests|adults|pax|persons|of\s+us|in\s+the\s+group)/i
  );
  const groupSize = match ? parseInt(match[1], 10) : null;

  if (!groupSize) {
    return null;
  }

  const fittingVillas = villas.filter((villa) => villa.sleeps >= groupSize);

  if (!fittingVillas.length) {
    return {
      reply: `Our largest villa (**Valerian Palm**) sleeps 10. For a group of ${groupSize}, best to chat with us - +357 97 494 941.`
    };
  }

  const list = fittingVillas
    .map((villa) => `- **${villa.name}** - sleeps ${villa.sleeps}, from EUR ${villa.priceFrom}/night`)
    .join('\n');

  return {
    reply: `For ${groupSize} guests, these fit:\n${list}`,
    action: { type: 'scroll', to: '#stays', label: 'Browse all stays' }
  };
}

function locationIntent(question: string, villas: Villa[]): ChatReply | null {
  if (!/\b(where|location|address|map|neighbou?rhood|area|close\s+to|near)/i.test(question)) {
    return null;
  }

  const villa = findVilla(question, villas);

  if (villa) {
    return {
      reply: `**${villa.name}** is in ${villa.location_area ?? villa.location}. Exact address is shared after booking (the map on the villa page shows the approximate area).`,
      action: { type: 'link', to: `/stays/${villa.slug}`, label: 'Open map' }
    };
  }

  return {
    reply:
      'All three villas are in Ayia Napa, Cyprus. Ocean Dreams is on the seafront by Nissi Beach; Tropicana and Valerian Palm are quieter streets, 10 minutes from the centre.'
  };
}

function findVilla(question: string, villas: Villa[]): Villa | undefined {
  const normalizedQuestion = question.toLowerCase();

  return villas.find((villa) => {
    const name = villa.name.toLowerCase();
    if (normalizedQuestion.includes(name)) {
      return true;
    }

    const tokens = name
      .split(/\s+/)
      .filter((token) => token.length >= 5 && !['villa', 'suites'].includes(token));

    return tokens.some((token) => normalizedQuestion.includes(token));
  });
}

function villaIntent(question: string, villas: Villa[]): ChatReply | null {
  const villa = findVilla(question, villas);
  if (!villa) {
    return null;
  }

  return {
    reply: `**${villa.name}** - ${villa.tagline}\n\nSleeps ${villa.sleeps} - ${villa.bedrooms} bed - from **EUR ${villa.priceFrom}/night**. ${villa.summary.split('.').slice(0, 2).join('.')}.`,
    action: { type: 'link', to: `/stays/${villa.slug}`, label: `Open ${villa.name}` }
  };
}

function fuzzyFaq(question: string): ChatReply | null {
  const tokens = new Set(
    question
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  );

  let bestMatch: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of FAQ) {
    const score = entry.match.reduce((total, phrase) => {
      const hit = phrase
        .toLowerCase()
        .split(/\s+/)
        .every((token) => tokens.has(token));

      return total + (hit ? phrase.split(/\s+/).length : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch && bestScore >= 1 ? { reply: bestMatch.reply } : null;
}

/**
 * Deterministic reply engine. Chain of responsibility:
 * greetings/about -> booking -> pricing -> villas by name -> capacity -> location
 * -> amenities -> FAQ fuzzy match -> fallback.
 */
export function replyTo(userMessage: string, villas: Villa[] = []): ChatReply {
  const question = userMessage.trim();
  if (!question) {
    return { reply: 'Ask me anything about our villas, booking, or Ayia Napa.' };
  }

  for (const intent of INTENTS) {
    if (intent.test(question)) {
      return { reply: intent.reply(), action: intent.action };
    }
  }

  const intents = [
    priceIntent(question, villas),
    villaIntent(question, villas),
    capacityIntent(question, villas),
    locationIntent(question, villas),
    amenityIntent(question, villas),
    fuzzyFaq(question)
  ];

  const matchedIntent = intents.find(Boolean);
  if (matchedIntent) {
    return matchedIntent;
  }

  return {
    reply:
      "I'm not sure - let me connect you to a human on our team. WhatsApp **+357 97 494 941** or email **info@aquamarine365.com**, replies within the hour.",
    action: { type: 'link', to: 'https://wa.me/35797494941', label: 'Open WhatsApp', external: true }
  };
}

export const SUGGESTIONS: string[] = [
  'How much is Ocean Dreams?',
  'Is it pet-friendly?',
  'Villas for 6 people',
  'Cancellation policy?'
];
