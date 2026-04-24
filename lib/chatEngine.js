const FAQ = [
  {
    match: ['cheaper', 'discount', 'save', 'cost less', 'why direct', 'platform fee', 'airbnb fee', 'direct cheap'],
    reply:
      "Yes — booking direct skips the 15–20% platform service fee, and we don't mark up to absorb it. On a €1,800 week that's €270+ back in your pocket. No hidden cleaning charge at checkout either."
  },
  {
    match: ['broken', 'break', 'emergency', 'problem', 'support', 'help during', 'something wrong', 'ac not working', 'wifi down'],
    reply:
      "Message us on WhatsApp — we're on the island, so most fixes happen within two hours (A/C, Wi-Fi, hot water). Average message response: under 10 minutes, 8am–10pm Cyprus time. +357 97 494 941."
  },
  {
    match: ['cancel', 'refund', 'change my mind', 'cancellation', 'cancellation policy'],
    reply:
      'Free cancellation up to **30 days** before arrival — full deposit refund. Inside 30 days, we refund whatever we can re-book for. No fine print.'
  },
  {
    match: ['airport', 'transfer', 'pickup', 'pick up', 'lca', 'larnaca', 'getting there', 'from airport'],
    reply:
      'LCA (Larnaca airport) is about 45 minutes by car. We arrange transfer at €65 one-way or €110 round-trip. Rental cars at local rates on request.'
  },
  {
    match: ['pet', 'dog', 'cat', 'pets allowed', 'pet friendly'],
    reply:
      'Dogs are welcome at **Valerian Palm Villa** (fully fenced garden). Sorry, no pets at Ocean Dreams or Tropicana due to building rules.'
  },
  {
    match: ['kid', 'child', 'baby', 'cot', 'high chair', 'family', 'children'],
    reply:
      'Kids always welcome. Travel cots and high chairs on request at no extra charge. Valerian Palm has a fully-fenced garden — popular with families.'
  },
  {
    match: ['pay', 'payment', 'deposit', 'how do i pay', 'stripe', 'credit card', 'apple pay', 'google pay', 'crypto'],
    reply:
      '30% deposit holds your booking. Balance is due 2 weeks before arrival. We use Stripe — all major cards, Apple Pay, Google Pay. No crypto, no wire transfers.'
  },
  {
    match: ['code', 'discount code', 'direct7', 'promo', 'offer', 'free night'],
    reply:
      'Mention **DIRECT7** when you enquire — on stays of 7+ nights May through October, you get the week for the price of six nights. No platform fees, ever.'
  },
  {
    match: ['contact', 'phone', 'whatsapp', 'call', 'email', 'reach you', 'address'],
    reply:
      'WhatsApp or call **+357 97 494 941** · email **info@aquamarine365.com**. We reply within the hour, 8am–10pm Cyprus time. Office: 61 Tefkrou Anthia, Ayia Napa 5330.'
  },
  {
    match: ['licensed', 'regulated', 'trust', 'legit', 'legitimate', 'scam'],
    reply:
      "Licensed by the Cyprus Deputy Ministry of Tourism (CY-DMT). Twelve years operating in Ayia Napa, 300+ stays, 4.9/5 average rating, 68% return or referred guests."
  }
];

// Intent classifiers beyond FAQ — stateless, villa-independent
const INTENTS = [
  {
    test: (q) => /\b(book|reserve|reservation|enquire|inquire|enquiry|availability|check\s+date)/i.test(q),
    reply: () =>
      'Easiest way to check dates is the **Check availability** form — I\'ll scroll you there. Or WhatsApp +357 97 494 941 and the team will reply within the hour.',
    action: { type: 'scroll', to: '#book', label: 'Open booking form' }
  },
  {
    test: (q) => /\b(hi|hey|hello|hola|yo|good\s+(morning|afternoon|evening))\b/i.test(q.trim()),
    reply: () =>
      "Hi! I can answer questions about our three villas in Ayia Napa — prices, what's included, how booking works. What are you looking for?"
  },
  {
    test: (q) => /\b(thank|thanks|cheers|ta|appreciate)/i.test(q),
    reply: () => "Anytime. If you want a human next, ping us on WhatsApp: +357 97 494 941."
  },
  {
    test: (q) => /\b(who\s+are\s+you|what\s+is\s+aquamarine|about\s+you|tell\s+me\s+about)/i.test(q),
    reply: () =>
      "Aquamarine is an owner-operated collection of three private villas and suites in Ayia Napa, Cyprus. We manage everything ourselves — cleaning, check-in, 24/7 support — so you skip the platform fees and get one team on the island."
  }
];

function priceIntent(q, villas) {
  if (!/\b(price|cost|rate|how\s+much|per\s+night|nightly|from\s+€?)/i.test(q)) return null;
  const v = findVilla(q, villas);
  if (v) {
    return {
      reply: `**${v.name}** starts from **€${v.priceFrom}/night**. Rates vary by season — book 7+ nights May–October with code DIRECT7 and you get the week for six nights' price.`,
      action: { type: 'link', to: `/stays/${v.slug}`, label: `View ${v.name}` }
    };
  }
  const list = villas
    .map((x) => `- **${x.name}** — sleeps ${x.sleeps}, from **€${x.priceFrom}/night**`)
    .join('\n');
  return {
    reply: `Here's the line-up:\n\n${list}\n\nDiscount code **DIRECT7** drops week-long stays to six-night pricing (May–Oct).`
  };
}

function amenityIntent(q, villas) {
  const hit = /\b(pool|beach|sea\s*view|wifi|internet|ac|air\s*cond|kitchen|bbq|parking|cot|view|terrace|garden|washer)/i;
  if (!hit.test(q)) return null;
  const v = findVilla(q, villas);
  const term = q.match(hit)?.[0]?.toLowerCase() ?? '';
  if (v) {
    const matches = [...v.amenities, ...v.highlights]
      .filter((a) => a.toLowerCase().includes(term.split(/\s+/)[0]))
      .slice(0, 3);
    if (matches.length) {
      return {
        reply: `**${v.name}** has:\n${matches.map((m) => `- ${m.replace(/&amp;/g, '&')}`).join('\n')}`,
        action: { type: 'link', to: `/stays/${v.slug}`, label: `See all amenities` }
      };
    }
  }
  const withTerm = villas.filter((x) =>
    [...x.amenities, ...x.highlights].some((a) => a.toLowerCase().includes(term.split(/\s+/)[0]))
  );
  if (!withTerm.length) return null;
  return {
    reply: `Villas with ${term}: ${withTerm.map((x) => `**${x.name}**`).join(', ')}. Want details on one?`
  };
}

function capacityIntent(q, villas) {
  const m = q.match(/\b(\d{1,2})\s*(people|guests|adults|pax|persons|of\s+us|in\s+the\s+group)/i);
  const n = m ? parseInt(m[1], 10) : null;
  if (!n) return null;
  const fit = villas.filter((v) => v.sleeps >= n);
  if (!fit.length) {
    return {
      reply: `Our largest villa (**Valerian Palm**) sleeps 10. For a group of ${n}, best to chat with us — +357 97 494 941.`
    };
  }
  const list = fit
    .map((v) => `- **${v.name}** — sleeps ${v.sleeps}, from €${v.priceFrom}/night`)
    .join('\n');
  return {
    reply: `For ${n} guests, these fit:\n${list}`,
    action: { type: 'scroll', to: '#stays', label: 'Browse all stays' }
  };
}

function locationIntent(q, villas) {
  if (!/\b(where|location|address|map|neighbou?rhood|area|close\s+to|near)/i.test(q)) return null;
  const v = findVilla(q, villas);
  if (v) {
    return {
      reply: `**${v.name}** is in ${v.location_area ?? v.location}. Exact address is shared after booking (the map on the villa page shows the approximate area).`,
      action: { type: 'link', to: `/stays/${v.slug}`, label: 'Open map' }
    };
  }
  return {
    reply:
      "All three villas are in Ayia Napa, Cyprus. Ocean Dreams is on the seafront by Nissi Beach; Tropicana and Valerian Palm are quieter streets, 10 minutes from the centre."
  };
}

function findVilla(q, villas) {
  const lower = q.toLowerCase();
  return villas.find((v) => {
    const name = v.name.toLowerCase();
    if (lower.includes(name)) return true;
    const tokens = name.split(/\s+/).filter((t) => t.length >= 5 && !['villa', 'suites'].includes(t));
    return tokens.some((t) => lower.includes(t));
  });
}

function villaIntent(q, villas) {
  const v = findVilla(q, villas);
  if (!v) return null;
  return {
    reply: `**${v.name}** — ${v.tagline}\n\nSleeps ${v.sleeps} · ${v.bedrooms} bed · from **€${v.priceFrom}/night**. ${v.summary.split('.').slice(0, 2).join('.')}.`,
    action: { type: 'link', to: `/stays/${v.slug}`, label: `Open ${v.name}` }
  };
}

function fuzzyFaq(q) {
  const tokens = new Set(
    q
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  );
  let best = null;
  let bestScore = 0;
  for (const f of FAQ) {
    const score = f.match.reduce((acc, phrase) => {
      const hit = phrase.toLowerCase().split(/\s+/).every((t) => tokens.has(t));
      return acc + (hit ? phrase.split(/\s+/).length : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = f;
    }
  }
  return bestScore >= 1 ? { reply: best.reply } : null;
}

/**
 * Deterministic reply engine. Chain of responsibility:
 * greetings/about → booking → pricing → villas by name → capacity → location
 * → amenities → FAQ fuzzy match → fallback.
 */
export function replyTo(userMessage, villas = []) {
  const q = (userMessage || '').trim();
  if (!q) return { reply: "Ask me anything about our villas, booking, or Ayia Napa." };

  for (const i of INTENTS) {
    if (i.test(q)) return { reply: i.reply(q), action: i.action };
  }

  const price = priceIntent(q, villas);
  if (price) return price;

  const villa = villaIntent(q, villas);
  if (villa) return villa;

  const cap = capacityIntent(q, villas);
  if (cap) return cap;

  const loc = locationIntent(q, villas);
  if (loc) return loc;

  const amenity = amenityIntent(q, villas);
  if (amenity) return amenity;

  const faq = fuzzyFaq(q);
  if (faq) return faq;

  return {
    reply:
      "I'm not sure — let me connect you to a human on our team. WhatsApp **+357 97 494 941** or email **info@aquamarine365.com**, replies within the hour.",
    action: { type: 'link', to: 'https://wa.me/35797494941', label: 'Open WhatsApp', external: true }
  };
}

export const SUGGESTIONS = [
  'How much is Ocean Dreams?',
  'Is it pet-friendly?',
  'Villas for 6 people',
  'Cancellation policy?'
];
