import { cn } from '@/lib/utils';

export function Spinner({ className, size = 16 }) {
  return (
    <span
      className={cn('inline-block align-middle', className)}
      style={{
        width: size,
        height: size,
        border: '2px solid currentColor',
        borderRightColor: 'transparent',
        borderRadius: '50%',
        animation: 'aq-spin 0.8s linear infinite'
      }}
      aria-hidden
    />
  );
}

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
