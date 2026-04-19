'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Radix positions PopoverContent via a transform (Floating UI).
 * Don't run a translate animation on the Content itself — the inner
 * `[data-aq-pop]` box only fades so positioning stays correct.
 */
const PopoverContent = React.forwardRef(
  ({ className, align = 'start', sideOffset = 6, children, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className="z-[95] outline-none"
        {...props}
      >
        <div
          data-aq-pop=""
          className={cn(
            'rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] p-2 shadow-2xl',
            'origin-top',
            className
          )}
        >
          {children}
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
