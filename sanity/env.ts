function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (!value) throw new Error(errorMessage);
  return value;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing NEXT_PUBLIC_SANITY_DATASET'
);

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-01';

export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? '/studio';

// Optional — only set in environments that need draft/live access.
// Without it, the public CDN client is used.
export const readToken = process.env.SANITY_API_READ_TOKEN ?? '';
