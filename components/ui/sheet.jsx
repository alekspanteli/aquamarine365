'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-aq-overlay=""
    className={cn('fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm', className)}
    {...props}
  />
));
SheetOverlay.displayName = 'SheetOverlay';

const sidePos = {
  right: 'right-0 top-0 h-full w-full max-w-sm border-l',
  left: 'left-0 top-0 h-full w-full max-w-sm border-r',
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t'
};

const SheetContent = React.forwardRef(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-aq-sheet=""
      data-side={side}
      className={cn(
        'fixed z-[95] bg-[var(--bg)] text-[var(--fg)] shadow-xl border-[var(--line)]',
        sidePos[side],
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-5 right-5 z-10 rounded-full h-10 w-10 inline-flex items-center justify-center hover:bg-[var(--surface-2)] text-[var(--fg)] transition">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = 'SheetContent';

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetOverlay };
