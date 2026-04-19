'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

function Label({ className, ref, ...props }) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn('label !text-[0.68rem] !text-[var(--fg-muted)]', className)}
      {...props}
    />
  );
}

export { Label };
