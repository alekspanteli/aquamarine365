'use client';

import * as React from 'react';
import { Separator as SeparatorPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>;

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-[var(--line)]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
