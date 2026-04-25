'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type CommandProps = React.ComponentProps<typeof CommandPrimitive>;

function Command({ className, ref, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      ref={ref}
      data-slot="command"
      className={cn('flex flex-col w-full', className)}
      {...props}
    />
  );
}

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  filter?: CommandProps['filter'];
  children?: React.ReactNode;
}

function CommandDialog({
  open,
  onOpenChange,
  title = 'Search Aquamarine',
  description = 'Search villas, sections, and actions.',
  filter,
  children
}: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <Command filter={filter}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>;

function CommandInput({ className, ref, ...props }: CommandInputProps) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex items-center gap-3 px-5 border-b border-[var(--line)]"
    >
      <svg className="text-[var(--fg-muted)] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input"
        className={cn(className)}
        {...props}
      />
      <kbd className="font-mono text-[0.7rem] text-[var(--fg-muted)] border border-[var(--line)] rounded px-2 py-0.5">ESC</kbd>
    </div>
  );
}

const CommandList = CommandPrimitive.List;
const CommandEmpty = CommandPrimitive.Empty;
const CommandGroup = CommandPrimitive.Group;
const CommandItem = CommandPrimitive.Item;

type CommandSeparatorProps = React.ComponentProps<typeof CommandPrimitive.Separator>;

function CommandSeparator({ className, ref, ...props }: CommandSeparatorProps) {
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
