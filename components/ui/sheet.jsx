'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { X } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;
const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;

function SheetOverlay({ className, ref, ...props }) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      data-aq-overlay=""
      className={cn('fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm', className)}
      {...props}
    />
  );
}

const sidePos = {
  right: 'right-0 top-0 h-full w-full max-w-sm border-l',
  left: 'left-0 top-0 h-full w-full max-w-sm border-r',
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t'
};

function SheetContent({
  side = 'right',
  className,
  children,
  ref,
  hideClose = false,
  ...props
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
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
        {!hideClose && (
          <DialogPrimitive.Close className="absolute top-5 right-5 z-10 rounded-full h-10 w-10 inline-flex items-center justify-center hover:bg-[var(--surface-2)] text-[var(--fg)] transition">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetTitle,
  SheetDescription
};
