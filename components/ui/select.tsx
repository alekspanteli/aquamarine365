'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { Check, CaretDown, CaretUp } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger>;

function SelectTrigger({ className, children, ref, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(
        'flex h-12 w-full items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--fg)]',
        'focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20',
        'disabled:cursor-not-allowed disabled:opacity-60 transition-colors',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDown className="h-4 w-4 opacity-60" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>;

function SelectContent({ className, children, position = 'popper', ref, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        data-slot="select-content"
        data-aq-pop=""
        className={cn(
          'relative z-[95] min-w-[8rem] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] shadow-xl',
          'max-h-64',
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6">
          <CaretUp className="h-4 w-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6">
          <CaretDown className="h-4 w-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;

function SelectItem({ className, children, ref, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none',
        'focus:bg-[var(--surface-2)] data-[state=checked]:text-[var(--accent)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
