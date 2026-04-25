import type { ReactNode } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ProgressBar from '@/components/ProgressBar';
import Footer from '@/components/Footer';

interface LegalLayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main className="pt-10 md:pt-16 pb-24 min-h-[70svh]">
        <div className="container-x max-w-[820px]">
          <div className="mb-10 flex items-center gap-6 text-sm">
            <Link href="/" className="label hover:text-[var(--fg)] transition">
              ← Aquamarine
            </Link>
            <nav className="flex gap-5 text-[var(--fg-muted)]" aria-label="Legal pages">
              <Link href="/legal/privacy" className="hover:text-[var(--fg)]">Privacy</Link>
              <Link href="/legal/cookies" className="hover:text-[var(--fg)]">Cookies</Link>
              <Link href="/legal/terms" className="hover:text-[var(--fg)]">Terms</Link>
            </nav>
          </div>
          <article
            className="
              [&_h1]:font-display [&_h1]:text-4xl md:[&_h1]:text-5xl [&_h1]:tracking-tight [&_h1]:mb-3 [&_h1]:leading-tight
              [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-tight
              [&_h3]:font-display [&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-2
              [&_p]:text-[var(--fg-2)] [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-[var(--fg-2)] [&_ul]:leading-relaxed [&_ul]:mb-4 [&_ul]:space-y-1.5
              [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[var(--accent-deep)]
              [&_strong]:text-[var(--fg)] [&_strong]:font-medium
              [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:bg-[var(--surface-2)] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5
            "
          >
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
