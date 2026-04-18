'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
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
));
Input.displayName = 'Input';

export { Input };
