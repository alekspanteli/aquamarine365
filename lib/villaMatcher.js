/**
 * Deterministic villa recommender. Each villa gets a score per answer;
 * highest total wins, with a reason string built from the strongest signals.
 */
const WEIGHTS = {
  group: {
    couple: { 'ocean-dreams-suites': 3, 'dream-tropicana-villa': 1, 'valerian-palm-villa': 0 },
    family: { 'ocean-dreams-suites': 1, 'dream-tropicana-villa': 3, 'valerian-palm-villa': 2 },
    friends: { 'ocean-dreams-suites': 0, 'dream-tropicana-villa': 2, 'valerian-palm-villa': 3 },
    extended: { 'ocean-dreams-suites': 0, 'dream-tropicana-villa': 1, 'valerian-palm-villa': 3 }
  },
  vibe: {
    sea: { 'ocean-dreams-suites': 3, 'dream-tropicana-villa': 0, 'valerian-palm-villa': 1 },
    quiet: { 'ocean-dreams-suites': 1, 'dream-tropicana-villa': 3, 'valerian-palm-villa': 1 },
    entertain: { 'ocean-dreams-suites': 0, 'dream-tropicana-villa': 2, 'valerian-palm-villa': 3 }
  },
  budget: {
    low: { 'ocean-dreams-suites': 3, 'dream-tropicana-villa': 1, 'valerian-palm-villa': 0 },
    mid: { 'ocean-dreams-suites': 1, 'dream-tropicana-villa': 3, 'valerian-palm-villa': 1 },
    high: { 'ocean-dreams-suites': 0, 'dream-tropicana-villa': 1, 'valerian-palm-villa': 3 }
  },
  need: {
    beach: { 'ocean-dreams-suites': 3, 'dream-tropicana-villa': 0, 'valerian-palm-villa': 1 },
    pets: { 'ocean-dreams-suites': 0, 'dream-tropicana-villa': 0, 'valerian-palm-villa': 3 },
    pool: { 'ocean-dreams-suites': 0, 'dream-tropicana-villa': 3, 'valerian-palm-villa': 3 },
    none: { 'ocean-dreams-suites': 1, 'dream-tropicana-villa': 1, 'valerian-palm-villa': 1 }
  }
};

const REASONS = {
  'ocean-dreams-suites': {
    group: { couple: 'right-sized for two', family: 'compact for a small family' },
    vibe: { sea: 'the one with open water at the doorstep' },
    budget: { low: 'our most accessible nightly rate' },
    need: { beach: '8-minute walk to Nissi Beach' }
  },
  'dream-tropicana-villa': {
    group: { family: 'three bedrooms, built for a family', friends: 'sleeps six comfortably' },
    vibe: { quiet: 'countryside quiet, ten minutes from town', entertain: 'heated pool + dinner-party kitchen' },
    budget: { mid: 'mid-range price with premium features' },
    need: { pool: 'heated 10×5m private pool' }
  },
  'valerian-palm-villa': {
    group: { friends: 'room for everyone — 5 bedrooms, 5 bathrooms', extended: 'five bedrooms for the whole clan' },
    vibe: { entertain: 'game room, BBQ, a 12×5m pool' },
    budget: { high: 'the most space and amenities we offer' },
    need: { pets: 'fully fenced garden, pet friendly', pool: '12×5m private pool with shallow end' }
  }
};

export function recommendVilla(villas, answers) {
  const scores = Object.fromEntries(villas.map((v) => [v.slug, 0]));
  for (const [q, a] of Object.entries(answers)) {
    const weights = WEIGHTS[q]?.[a];
    if (!weights) continue;
    for (const [slug, w] of Object.entries(weights)) scores[slug] += w;
  }

  const sorted = villas
    .map((v) => ({ villa: v, score: scores[v.slug] }))
    .sort((a, b) => b.score - a.score);

  const winner = sorted[0];
  const runnerUp = sorted[1];

  // Build a reason from the two strongest answer signals for this villa
  const reasons = [];
  for (const [q, a] of Object.entries(answers)) {
    const r = REASONS[winner.villa.slug]?.[q]?.[a];
    if (r) reasons.push(r);
  }
  const reason =
    reasons.slice(0, 2).join(' · ') ||
    `Best overall fit for what you told us.`;

  return {
    winner: winner.villa,
    runnerUp: runnerUp.villa,
    reason
  };
}

export const QUIZ = [
  {
    id: 'group',
    prompt: "Who's coming?",
    options: [
      { id: 'couple', label: 'A couple', sub: '2 guests' },
      { id: 'family', label: 'A family', sub: '4–6 guests' },
      { id: 'friends', label: 'A group of friends', sub: '6–10 guests' },
      { id: 'extended', label: 'Extended family', sub: '8–10 guests' }
    ]
  },
  {
    id: 'vibe',
    prompt: "What's the vibe?",
    options: [
      { id: 'sea', label: 'Right by the sea', sub: 'Walk to the beach, wake to water' },
      { id: 'quiet', label: 'Quiet & tucked away', sub: "Countryside, away from the centre" },
      { id: 'entertain', label: 'Room to entertain', sub: 'Big pool, BBQ, indoor space' }
    ]
  },
  {
    id: 'budget',
    prompt: "What's the nightly budget?",
    options: [
      { id: 'low', label: 'Up to €300', sub: 'Our most accessible option' },
      { id: 'mid', label: '€300 – €500', sub: 'Mid-tier with premium features' },
      { id: 'high', label: '€500+', sub: "Biggest house, most amenities" }
    ]
  },
  {
    id: 'need',
    prompt: 'Any must-haves?',
    options: [
      { id: 'beach', label: 'Walk to the beach', sub: '' },
      { id: 'pool', label: 'Private pool', sub: '' },
      { id: 'pets', label: 'Pet friendly', sub: 'Dog coming too' },
      { id: 'none', label: "Nothing specific", sub: '' }
    ]
  }
];
