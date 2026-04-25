import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { readToken } from './env';

// SanityLive streams content updates straight from Sanity into the page
// without needing webhook revalidation. Without a read token it renders
// nothing and `sanityFetch` falls back to the public client.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken
});
