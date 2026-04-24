import type { QuizAnswers, QuizQuestion, Villa, VillaRecommendation } from '@/types/domain';

type WeightMap = Record<string, Record<string, number>>;
type ReasonMap = Record<string, Record<string, Record<string, string>>>;

/**
 * Deterministic villa recommender. Each villa gets a score per answer and
 * the strongest matching reasons are surfaced back to the user.
 */
const WEIGHTS: Record<string, WeightMap> = {
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

const REASONS: ReasonMap = {
  'ocean-dreams-suites': {
    group: { couple: 'right-sized for two', family: 'compact for a small family' },
    vibe: { sea: 'the one with open water at the doorstep' },
    budget: { low: 'our most accessible nightly rate' },
    need: { beach: '8-minute walk to Nissi Beach' }
  },
  'dream-tropicana-villa': {
    group: {
      family: 'three bedrooms, built for a family',
      friends: 'sleeps six comfortably'
    },
    vibe: {
      quiet: 'countryside quiet, ten minutes from town',
      entertain: 'heated pool + dinner-party kitchen'
    },
    budget: { mid: 'mid-range price with premium features' },
    need: { pool: 'heated 10x5m private pool' }
  },
  'valerian-palm-villa': {
    group: {
      friends: 'room for everyone - 5 bedrooms, 5 bathrooms',
      extended: 'five bedrooms for the whole clan'
    },
    vibe: { entertain: 'game room, BBQ, and a 12x5m pool' },
    budget: { high: 'the most space and amenities we offer' },
    need: { pets: 'fully fenced garden, pet friendly', pool: '12x5m private pool with shallow end' }
  }
};

export function recommendVilla(villas: Villa[], answers: QuizAnswers): VillaRecommendation | null {
  if (!villas.length) {
    return null;
  }

  const scores = Object.fromEntries(villas.map((villa) => [villa.slug, 0])) as Record<string, number>;

  for (const [questionId, answerId] of Object.entries(answers)) {
    if (!answerId) {
      continue;
    }

    const weights = WEIGHTS[questionId]?.[answerId];
    if (!weights) {
      continue;
    }

    for (const [slug, weight] of Object.entries(weights)) {
      scores[slug] = (scores[slug] ?? 0) + weight;
    }
  }

  const sorted = villas
    .map((villa) => ({ villa, score: scores[villa.slug] ?? 0 }))
    .sort((left, right) => right.score - left.score);

  const winner = sorted[0]?.villa;
  const runnerUp = sorted[1]?.villa ?? winner;

  if (!winner || !runnerUp) {
    return null;
  }

  const reasons: string[] = [];

  for (const [questionId, answerId] of Object.entries(answers)) {
    if (!answerId) {
      continue;
    }

    const reason = REASONS[winner.slug]?.[questionId]?.[answerId];
    if (reason) {
      reasons.push(reason);
    }
  }

  return {
    winner,
    runnerUp,
    reason: reasons.slice(0, 2).join(' - ') || 'Best overall fit for what you told us.'
  };
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 'group',
    prompt: "Who's coming?",
    options: [
      { id: 'couple', label: 'A couple', sub: '2 guests' },
      { id: 'family', label: 'A family', sub: '4-6 guests' },
      { id: 'friends', label: 'A group of friends', sub: '6-10 guests' },
      { id: 'extended', label: 'Extended family', sub: '8-10 guests' }
    ]
  },
  {
    id: 'vibe',
    prompt: "What's the vibe?",
    options: [
      { id: 'sea', label: 'Right by the sea', sub: 'Walk to the beach, wake to water' },
      { id: 'quiet', label: 'Quiet & tucked away', sub: 'Countryside, away from the centre' },
      { id: 'entertain', label: 'Room to entertain', sub: 'Big pool, BBQ, indoor space' }
    ]
  },
  {
    id: 'budget',
    prompt: "What's the nightly budget?",
    options: [
      { id: 'low', label: 'Up to EUR 300', sub: 'Our most accessible option' },
      { id: 'mid', label: 'EUR 300 - EUR 500', sub: 'Mid-tier with premium features' },
      { id: 'high', label: 'EUR 500+', sub: 'Biggest house, most amenities' }
    ]
  },
  {
    id: 'need',
    prompt: 'Any must-haves?',
    options: [
      { id: 'beach', label: 'Walk to the beach', sub: '' },
      { id: 'pool', label: 'Private pool', sub: '' },
      { id: 'pets', label: 'Pet friendly', sub: 'Dog coming too' },
      { id: 'none', label: 'Nothing specific', sub: '' }
    ]
  }
];
