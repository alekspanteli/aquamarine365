'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

function Command({ className, ref, ...props }) {
  return <CommandPrimitive ref={ref} className={cn('flex flex-col w-full', className)} {...props} />;
}

function CommandDialog({ open, onOpenChange, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Search Aquamarine</DialogTitle>
        <DialogDescription>Search villas, sections, and actions.</DialogDescription>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, ref, ...props }) {
  return (
    <div className="flex items-center gap-3 px-5 border-b border-[var(--line)]">
      <svg className="text-[var(--fg-muted)] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <CommandPrimitive.Input ref={ref} className={cn(className)} {...props} />
      <kbd className="font-mono text-[0.7rem] text-[var(--fg-muted)] border border-[var(--line)] rounded px-2 py-0.5">ESC</kbd>
    </div>
  );
}

const CommandList = CommandPrimitive.List;
const CommandEmpty = CommandPrimitive.Empty;
const CommandGroup = CommandPrimitive.Group;
const CommandItem = CommandPrimitive.Item;

function CommandSeparator({ className, ref, ...props }) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('h-px bg-[var(--line)] my-1', className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
};
