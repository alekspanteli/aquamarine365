'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef(
  ({ className, align = 'start', sideOffset = 6, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        data-aq-dialog=""
        className={cn(
          'z-[95] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 text-[var(--fg)] shadow-2xl outline-none',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
