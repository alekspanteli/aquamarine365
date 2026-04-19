import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-mono uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[var(--line)] bg-[var(--surface)] text-[var(--fg-2)]',
        accent: 'border-transparent bg-[var(--accent)] text-white',
        soft: 'border-transparent bg-[var(--surface-2)] text-[var(--fg)]',
        punch:
          'border-transparent bg-[var(--punch-soft)] text-[var(--punch)]',
        outline: 'border-[var(--fg)]/20 text-[var(--fg)]',
        live: 'border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export function Badge({ className, variant, ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
