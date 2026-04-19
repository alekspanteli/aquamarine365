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
      data-slot="skeleton"
      className={cn(
        'relative overflow-hidden bg-[var(--surface-2)]',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        'before:animate-[aq-shimmer_1.4s_ease-in-out_infinite]',
        'dark:before:via-white/10',
        className
      )}
      aria-hidden
      {...props}
    />
  );
}

/**
 * Skeleton for image slots: darker tint + centered spinner so the user
 * never wonders "is that image loading or just empty?"
 */
export function ImageLoader({ className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--color-ink)]/10',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/55 before:to-transparent',
        'before:animate-[aq-shimmer_1.4s_ease-in-out_infinite]',
        'dark:before:via-white/12',
        className
      )}
      role="status"
      aria-label="Loading image"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-[var(--accent)]">
          <Spinner size={22} />
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-[var(--fg-muted)]">
            Loading
          </span>
        </div>
      </div>
    </div>
  );
}
