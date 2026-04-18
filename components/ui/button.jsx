'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-[var(--accent)]',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:-translate-y-px active:translate-y-0',
        punch:
          'bg-[var(--punch)] text-white hover:brightness-110 hover:-translate-y-px',
        outline:
          'border border-[var(--line)] bg-transparent text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--surface)]',
        ghost:
          'bg-transparent text-[var(--fg)] hover:bg-[var(--surface-2)]',
        link:
          'underline-offset-4 hover:underline text-[var(--accent)] p-0 h-auto'
      },
      size: {
        default: 'h-11 px-5 text-[0.95rem] rounded-full',
        sm: 'h-9 px-4 text-sm rounded-full',
        lg: 'h-14 px-7 text-base rounded-full',
        icon: 'h-10 w-10 rounded-full'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
