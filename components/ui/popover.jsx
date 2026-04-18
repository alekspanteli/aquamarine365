'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Radix positions the outer Content via a transform (Floating UI).
 * Don't animate transform on the Content itself — wrap the animated
 * styles on an inner box so positioning and animation don't collide.
 */
const PopoverContent = React.forwardRef(
  ({ className, align = 'start', sideOffset = 6, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className="z-[95] outline-none"
        {...props}
      >
        <div
          data-aq-dialog=""
          className={cn(
            'rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] p-2 shadow-2xl',
            'will-change-[transform,opacity] origin-top',
            className
          )}
        >
          {props.children}
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
