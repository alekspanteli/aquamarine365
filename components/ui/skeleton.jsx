import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--surface-2)]',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
        'before:animate-[aq-shimmer_1.4s_ease-in-out_infinite]',
        'dark:before:via-white/10',
        className
      )}
      aria-hidden
      {...props}
    />
  );
}
