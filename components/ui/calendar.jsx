'use client';

import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-3',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-display font-medium',
        nav: 'flex items-center gap-1',
        nav_button:
          'inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-transparent hover:bg-[var(--surface-2)] transition opacity-70 hover:opacity-100',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell:
          'text-[var(--fg-muted)] rounded-md w-9 font-mono text-[0.65rem] uppercase tracking-wider',
        row: 'flex w-full mt-1',
        cell: 'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
        day: 'inline-flex h-9 w-9 items-center justify-center rounded-full p-0 font-normal aria-selected:opacity-100 hover:bg-[var(--surface-2)] transition',
        day_selected:
          'bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] focus:bg-[var(--fg)] focus:text-[var(--bg)]',
        day_today: 'text-[var(--accent)] font-medium',
        day_outside: 'text-[var(--fg-muted)]/50',
        day_disabled: 'text-[var(--fg-muted)]/40 pointer-events-none',
        day_range_middle: 'aria-selected:bg-[var(--surface-2)] aria-selected:text-[var(--fg)] rounded-none',
        day_range_start: 'rounded-r-none',
        day_range_end: 'rounded-l-none',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />
      }}
      {...props}
    />
  );
}
