import { createImageUrlBuilder, type ImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import type { SanityImage } from '@/types/domain';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source).auto('format').fit('max');
}

export function imageUrl(image: SanityImage | null | undefined, width = 1600): string | null {
  if (!image) return null;
  if (image.ref) {
    return urlFor(image.ref as SanityImageSource).width(width).quality(80).url();
  }
  return image.url ?? null;
}
