'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({ className, ref, ...props }) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      data-aq-overlay=""
      className={cn('fixed inset-0 z-[90] bg-black/55 backdrop-blur-md', className)}
      {...props}
    />
  );
}

// Content is the centered box itself — clicks outside land on the Overlay
// so Radix's onPointerDownOutside dismisses the dialog. Positioned via
// inline-style translate so our CSS animation's transform isn't overridden.
function DialogContent({ className, children, ref, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
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
  );
}

function DialogTitle({ className, ref, ...props }) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn('sr-only', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ref, ...props }) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn('sr-only', className)}
      {...props}
    />
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogDescription };
