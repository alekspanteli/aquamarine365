'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Wordmark-only lockup. No gradient dot, no icon — the way Sotheby's
 * International Realty, Knight Frank, Aman, Belmond, and most serious
 * hospitality brands actually present. The typography is the identity.
 *
 * - 'Aquamarine' set in Source Serif at medium weight, slightly tight
 *   tracking, crisp leading
 * - Always wraps in a Link to /, clickable everywhere it renders
 */
export default function Logo({ className, invert = false, small = false, onNavigate }) {
  return (
    <Link
      href="/"
      aria-label="Aquamarine — home"
      onClick={onNavigate}
      className={cn(
        'group inline-flex items-baseline gap-1.5 leading-none select-none',
        invert ? 'text-white' : 'text-[var(--fg)]',
        'transition-opacity hover:opacity-75',
        className
      )}
    >
      <span
        className={cn(
          'font-display tracking-[-0.01em] leading-none font-medium',
          small ? 'text-lg' : 'text-xl md:text-[1.35rem]'
        )}
      >
        Aquamarine
      </span>
    </Link>
  );
}
