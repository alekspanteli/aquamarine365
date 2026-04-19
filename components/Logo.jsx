'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Aquamarine wordmark. Flat, single-color, no gradient dot — the kind of
 * mark real property brands use (Knight Frank, Sotheby's International,
 * Onefinestay). The initial 'A' drops its bowl-fill and shows a thin
 * horizon line across the crossbar — a subtle sea cue, hand-built as an
 * SVG path so it scales cleanly.
 *
 * Always wraps in a Link to `/` so the whole lockup is clickable (brand
 * convention).
 */
export default function Logo({ className, invert = false, small = false }) {
  const color = invert ? 'currentColor' : 'var(--fg)';

  return (
    <Link
      href="/"
      aria-label="Aquamarine — home"
      className={cn(
        'group inline-flex items-center gap-2.5 leading-none select-none',
        className
      )}
    >
      <svg
        width={small ? 18 : 22}
        height={small ? 18 : 22}
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
        className="transition-transform duration-300 group-hover:-translate-y-px"
      >
        {/* Triangular A */}
        <path
          d="M2.5 20 L11 2 L19.5 20"
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Horizon / sea-line crossbar */}
        <path
          d="M5.5 14 L16.5 14"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Tiny horizon dot for sun */}
        <circle cx="11" cy="14" r="0.9" fill="var(--accent)" />
      </svg>
      <span
        className={cn(
          'font-display tracking-[-0.01em] leading-none',
          small ? 'text-base' : 'text-lg md:text-xl',
          'transition-opacity group-hover:opacity-80'
        )}
        style={{ color }}
      >
        Aquamarine
      </span>
    </Link>
  );
}
