'use client';

import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

// react-day-picker v9 renamed most classNames keys and replaced the
// `IconLeft` / `IconRight` components with a single `Chevron` component.
// This component targets the v9 API and adapts the canonical shadcn
// styling to our design tokens (--fg, --accent, --line, --surface-2).
export function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const def = getDefaultClassNames();

  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn('relative p-3', className)}
      classNames={{
        root: cn('relative w-fit', def.root),
        months: cn('relative flex flex-col sm:flex-row gap-4', def.months),
        month: cn('flex flex-col gap-3', def.month),
        month_caption: cn(
          'flex h-9 items-center justify-center',
          def.month_caption
        ),
        caption_label: cn('text-sm font-display font-medium', def.caption_label),
        nav: cn('absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-1 pointer-events-none', def.nav),
        button_previous: cn(
          'pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition opacity-70 hover:opacity-100 aria-disabled:opacity-30',
          def.button_previous
        ),
        button_next: cn(
          'pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition opacity-70 hover:opacity-100 aria-disabled:opacity-30',
          def.button_next
        ),
        weekdays: cn('flex', def.weekdays),
        weekday: cn(
          'text-[var(--fg-muted)] w-9 font-mono text-[0.65rem] uppercase tracking-wider',
          def.weekday
        ),
        week: cn('flex w-full mt-1', def.week),
        day: cn(
          'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
          def.day
        ),
        day_button: cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full p-0 font-normal hover:bg-[var(--surface-2)] transition cursor-pointer',
          'data-[selected-single=true]:bg-[var(--fg)] data-[selected-single=true]:text-[var(--bg)]',
          'data-[range-start=true]:bg-[var(--fg)] data-[range-start=true]:text-[var(--bg)] data-[range-start=true]:rounded-r-none',
          'data-[range-end=true]:bg-[var(--fg)] data-[range-end=true]:text-[var(--bg)] data-[range-end=true]:rounded-l-none',
          'data-[range-middle=true]:bg-[var(--surface-2)] data-[range-middle=true]:text-[var(--fg)] data-[range-middle=true]:rounded-none',
          def.day_button
        ),
        today: cn('text-[var(--accent)] font-medium', def.today),
        outside: cn('text-[var(--fg-muted)]/50', def.outside),
        disabled: cn('text-[var(--fg-muted)]/40 pointer-events-none', def.disabled),
        hidden: cn('invisible', def.hidden),
        ...classNames
      }}
      components={{
        Chevron: ({ orientation, className: iconClass, ...iconProps }) => {
          const size = 'h-4 w-4';
          if (orientation === 'left')
            return <CaretLeft className={cn(size, iconClass)} {...iconProps} />;
          if (orientation === 'right')
            return <CaretRight className={cn(size, iconClass)} {...iconProps} />;
          return <CaretRight className={cn(size, iconClass)} {...iconProps} />;
        }
      }}
      {...props}
    />
  );
}
