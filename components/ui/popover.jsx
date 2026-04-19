'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

// Radix positions PopoverContent via a transform (Floating UI). The inner
// [data-aq-pop] box only fades — translating the Content would fight
// Radix's own transform and break positioning.
function PopoverContent({ className, align = 'start', sideOffset = 6, children, ref, ...props }) {
  return (
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
  );
}

export { Popover, PopoverTrigger, PopoverContent };
