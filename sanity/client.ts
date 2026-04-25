import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, readToken } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: { studioUrl: '/studio' }
});

// Token-bearing client for draft mode / preview / live content.
// Falls back to the public client when no token is configured.
export const draftClient = readToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'previewDrafts',
      token: readToken,
      stega: { studioUrl: '/studio' }
    })
  : client;
