'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import CommandPalette, { CommandPaletteTrigger } from './CommandPalette';
import { villas } from '@/data/villas';

const navItems = [
  { href: '/#stays', label: 'Stays' },
  { href: '/#why', label: 'Why us' },
  { href: '/#how', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--line)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href="/" aria-label="Aquamarine home" className="inline-flex items-center gap-2.5 font-medium">
            <span
              className="w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #B9E0DB, var(--accent) 70%)',
                boxShadow: 'inset 0 0 0 2px var(--bg), 0 2px 8px rgba(45,95,90,0.35)'
              }}
              aria-hidden
            />
            <span className="font-display text-xl tracking-tight">Aquamarine</span>
            <span className="label ml-2 hidden sm:inline">365</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navItems.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[0.95rem] text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPaletteTrigger onClick={() => setCmdOpen(true)} />
            <ThemeToggle />
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/#book">Check availability</Link>
            </Button>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)]"
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-0 p-0 w-full max-w-[420px]">
                <DrawerContent close={() => setSheetOpen(false)} openCommand={() => { setSheetOpen(false); setTimeout(() => setCmdOpen(true), 200); }} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </>
  );
}

function DrawerContent({ close, openCommand }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-4 border-b border-[var(--line)]">
        <div className="label mb-6">Menu</div>
        <h2 className="font-display text-4xl italic text-[var(--punch)] leading-none">
          Ayia Napa
        </h2>
        <p className="font-display text-4xl text-[var(--fg)] leading-none mt-1">
          run like a hotel.
        </p>
      </div>

      <nav className="flex flex-col divide-y divide-[var(--line)]" aria-label="Mobile">
        {navItems.map((n, i) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={close}
            className="group flex items-center justify-between px-8 py-5 hover:bg-[var(--surface-2)] transition"
          >
            <span className="flex items-center gap-4">
              <span className="label w-6">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-lg text-[var(--fg)]">{n.label}</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--fg-muted)] group-hover:text-[var(--punch)] group-hover:translate-x-1 transition" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </nav>

      <div className="px-8 py-6 border-t border-[var(--line)]">
        <div className="label mb-3">Stays</div>
        <ul className="space-y-3">
          {villas.map((v) => (
            <li key={v.slug}>
              <Link
                href={`/stays/${v.slug}`}
                onClick={close}
                className="flex items-center justify-between text-sm text-[var(--fg-2)] hover:text-[var(--fg)]"
              >
                <span>{v.name}</span>
                <span className="font-mono text-xs text-[var(--fg-muted)]">€{v.priceFrom}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto px-8 py-6 border-t border-[var(--line)] space-y-3">
        <button
          onClick={openCommand}
          className="w-full flex items-center justify-between px-4 py-3 rounded-full border border-[var(--line)] text-sm text-[var(--fg-2)] hover:border-[var(--fg)] transition"
        >
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Search anything
          </span>
          <kbd className="font-mono text-[0.65rem] border border-[var(--line)] rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
        <Button asChild size="lg" className="w-full">
          <Link href="/#book" onClick={close}>Check availability</Link>
        </Button>
        <div className="flex items-center justify-between pt-2">
          <a href="tel:+35797494941" className="text-sm text-[var(--fg-muted)] font-mono">+357 97 494 941</a>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
