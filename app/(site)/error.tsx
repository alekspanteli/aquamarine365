'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (typeof console !== 'undefined') console.error(error);
  }, [error]);

  return (
    <main className="container-x py-24 md:py-36 min-h-[60vh] flex flex-col items-start gap-6">
      <span className="label label-accent">Something went wrong</span>
      <h1 className="font-display max-w-[20ch]">
        A surprise we weren&apos;t expecting.
      </h1>
      <p className="text-[var(--fg-2)] max-w-[52ch] leading-relaxed">
        The page hit an error while rendering. Try again, or email{' '}
        <a className="underline underline-offset-4" href="mailto:info@aquamarine365.com">
          info@aquamarine365.com
        </a>{' '}
        and we&apos;ll sort it out.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center px-5 h-11 rounded-full bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition"
      >
        Try again
      </button>
    </main>
  );
}
