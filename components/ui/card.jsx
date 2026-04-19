import { cn } from '@/lib/utils';

function Card({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ref, ...props }) {
  return <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

function CardTitle({ className, ref, ...props }) {
  return (
    <h3
      ref={ref}
      className={cn('font-display text-xl leading-tight tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ref, ...props }) {
  return <p ref={ref} className={cn('text-sm text-[var(--fg-muted)]', className)} {...props} />;
}

function CardContent({ className, ref, ...props }) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ref, ...props }) {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
