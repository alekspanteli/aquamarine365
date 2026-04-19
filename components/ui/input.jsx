'use client';

import { cn } from '@/lib/utils';

function Input({ className, type = 'text', ref, ...props }) {
  return (
    <input
      ref={ref}
      data-slot="input"
      type={type}
      className={cn(
        'flex h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-base text-[var(--fg)]',
        'placeholder:text-[var(--fg-muted)]',
        'focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/20',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
}

export { Input };
