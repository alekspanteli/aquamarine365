'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { CalendarBlank as CalendarIcon } from '@phosphor-icons/react/dist/ssr';

const fmt = (d: Date) =>
  d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Calendar (react-day-picker) is only needed once the popover opens.
const Calendar = dynamic(() => import('./calendar').then((m) => m.Calendar), {
  ssr: false,
  loading: () => (
    <div className="p-8 text-sm text-[var(--fg-muted)] font-mono">Loading…</div>
  )
});

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

export function DatePicker({ value, onChange, placeholder = 'Pick a date', minDate, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-12 w-full items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-left',
            value ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]',
            'hover:border-[var(--fg-2)] focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/20 transition',
            className
          )}
        >
          <span>{value ? fmt(value) : placeholder}</span>
          <CalendarIcon className="h-4 w-4 text-[var(--fg-muted)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
          disabled={minDate ? { before: minDate } : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
