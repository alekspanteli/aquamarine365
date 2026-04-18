'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-aq-overlay=""
    className={cn('fixed inset-0 z-[90] bg-black/55 backdrop-blur-md', className)}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-aq-dialog=""
      className={cn(
        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[95] w-[min(640px,92vw)]',
        'bg-[var(--surface)] text-[var(--fg)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('sr-only', className)} {...props} />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('sr-only', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogDescription };
