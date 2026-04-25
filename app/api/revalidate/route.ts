import { updateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Sanity webhook target. Configure under Settings → API → Webhooks with
// a shared secret stored in SANITY_REVALIDATE_SECRET. The webhook should
// project `_type` and (optionally) `slug.current`, e.g.:
//   { "_type": _type, "slug": slug.current }
// On each invalidation we tag-revalidate the affected fetches.
type WebhookBody = { _type?: string; slug?: string };

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<WebhookBody>(
    req,
    process.env.SANITY_REVALIDATE_SECRET
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ message: 'Bad payload' }, { status: 400 });
  }

  const tags: string[] = [];
  switch (body._type) {
    case 'villa':
      tags.push('villa');
      if (body.slug) tags.push(`villa:${body.slug}`);
      break;
    case 'siteSettings':
      tags.push('site-settings');
      break;
    case 'privacyPage':
      tags.push('legal:privacy');
      break;
    case 'cookiePage':
      tags.push('legal:cookies');
      break;
    case 'termsPage':
      tags.push('legal:terms');
      break;
  }

  tags.forEach((tag) => updateTag(tag));
  return NextResponse.json({ revalidated: tags });
}
