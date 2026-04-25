'use client';

import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'bg-[var(--surface)] text-[var(--fg)] border border-[var(--line)] shadow-lg font-sans',
          title: 'font-display text-base',
          description: 'text-sm text-[var(--fg-muted)]',
          actionButton: 'bg-[var(--fg)] text-[var(--bg)]',
          cancelButton: 'bg-[var(--surface-2)] text-[var(--fg)]'
        }
      }}
      {...props}
    />
  );
}
