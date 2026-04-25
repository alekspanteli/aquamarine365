import * as React from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-1 text-[0.7rem] font-mono uppercase tracking-wider whitespace-nowrap transition-[color,background-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 aria-invalid:border-red-500/60 aria-invalid:ring-red-500/20 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-[var(--line)] bg-[var(--surface)] text-[var(--fg-2)] [a&]:hover:bg-[var(--surface-2)]',
        accent: 'border-transparent bg-[var(--accent)] text-white [a&]:hover:bg-[var(--accent-deep)]',
        soft: 'border-transparent bg-[var(--surface-2)] text-[var(--fg)] [a&]:hover:bg-[var(--line)]',
        punch: 'border-transparent bg-[var(--punch-soft)] text-[var(--punch)]',
        outline: 'border-[var(--fg)]/20 text-[var(--fg)] [a&]:hover:bg-[var(--surface-2)]',
        live: 'border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge({ className, variant = 'default', asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : 'span';
  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
