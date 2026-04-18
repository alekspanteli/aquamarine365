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

/**
 * The outer Content is a positioned flex centerer with NO transform at all —
 * that's what Radix focus-traps + announces. The inner `[data-aq-dialog]`
 * animates scale+opacity only. Keeping position + animation on separate
 * elements avoids fighting Tailwind's `translate` longhand.
 */
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 outline-none focus:outline-none"
      {...props}
    >
      <div
        data-aq-dialog=""
        className={cn(
          'relative w-full max-w-[640px] bg-[var(--surface)] text-[var(--fg)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden',
          'will-change-[transform,opacity] origin-center',
          className
        )}
      >
        {children}
      </div>
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
