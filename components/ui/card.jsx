import { cn } from '@/lib/utils';

function Card({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        'rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ref, ...props }) {
  return (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn('font-display text-xl leading-tight tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ref, ...props }) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn('text-sm text-[var(--fg-muted)]', className)}
      {...props}
    />
  );
}

function CardAction({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter };
