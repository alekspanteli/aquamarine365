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
 * Content is the centered box itself — NOT a fullscreen wrapper.
 * That way clicks outside the box land on the Overlay and Radix's
 * built-in onPointerDownOutside dismisses the dialog.
 *
 * We position via `top/left` + inline-style `transform: translate(-50%, -50%)`
 * (not Tailwind `-translate-*` utilities, since those write to the
 * `translate` longhand and would fight our CSS animation's `transform`).
 */
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-aq-dialog=""
      style={{ transform: 'translate(-50%, -50%)' }}
      className={cn(
        'fixed top-1/2 left-1/2 z-[95] w-[min(640px,calc(100vw-2rem))]',
        'bg-[var(--surface)] text-[var(--fg)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden outline-none',
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
