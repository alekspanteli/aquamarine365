import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/client';
import { readToken } from '@/sanity/env';

// Visual Editing's enable-preview endpoint. The Presentation tool calls this
// when an editor opens a preview; Sanity validates the token before flipping
// Next's draft mode cookie on. Without a token, draft mode stays off.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken })
});
