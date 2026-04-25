'use client';

import { useState } from 'react';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import { Skeleton } from '@/components/ui/skeleton';

interface MapEmbedProps {
  lat: number;
  lng: number;
  title?: string;
  label?: string;
  zoom?: number;
  className?: string;
}

/**
 * Google Maps embed.
 * - If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is set, uses the official
 *   Maps Embed API (https://developers.google.com/maps/documentation/embed).
 * - Otherwise falls back to the keyless maps.google.com iframe, which
 *   still works for pinned lat/lng without signup.
 * Both are lazy-loaded with a skeleton placeholder.
 */
export default function MapEmbed({
  lat,
  lng,
  title = 'Location',
  label,
  zoom = 14,
  className = ''
}: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=${zoom}`
    : `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=en&output=embed`;

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <figure className={`relative group ${className}`}>
      <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--surface-2)]">
        {!loaded && <Skeleton className="absolute inset-0" />}
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full border-0 transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          allowFullScreen
        />
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--fg-muted)]">
          {label ?? `${lat.toFixed(4)}° N · ${lng.toFixed(4)}° E`}
        </span>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--accent)] font-medium hover:underline underline-offset-4"
        >
          Open in Google Maps
          <ArrowSquareOut size={14} weight="regular" />
        </a>
      </figcaption>
    </figure>
  );
}
