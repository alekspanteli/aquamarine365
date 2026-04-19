'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { List, MagnifyingGlass, Phone, ChatCircle, Envelope, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { villas } from '@/data/villas';

const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });

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

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
        <div className="container-x flex items-center justify-between h-16 md:h-20 gap-3">
          <Link href="/" aria-label="Aquamarine home" className="inline-flex items-center gap-2.5 font-medium shrink-0">
            <span
              className="w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #B9E0DB, var(--accent) 70%)',
                boxShadow: 'inset 0 0 0 2px var(--bg), 0 2px 8px rgba(39,101,96,0.35)'
              }}
              aria-hidden
            />
            <span className="font-display text-lg md:text-xl tracking-tight">Aquamarine</span>
          </Link>

          {/* Desktop inline search pill */}
          <button
            onClick={() => setCmdOpen(true)}
            className="hidden md:inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-full border border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition text-sm bg-[var(--surface)] flex-1 max-w-sm"
          >
            <MagnifyingGlass size={14} />
            <span className="mr-auto">Search villas, FAQs, contact…</span>
            <kbd className="font-mono text-[0.65rem] px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--bg)]">⌘K</kbd>
          </button>

          <nav className="hidden xl:flex items-center gap-7" aria-label="Primary">
            {navItems.slice(0, 3).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[0.93rem] text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile search icon — always visible on top */}
            <button
              onClick={() => setCmdOpen(true)}
              aria-label="Open search"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)]"
            >
              <MagnifyingGlass size={16} />
            </button>
            <ThemeToggle />
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/#book">Check availability</Link>
            </Button>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="xl:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)]"
                  aria-label="Open menu"
                >
                  <List size={18} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-0 p-0 w-full max-w-[380px]">
                <DrawerContent
                  close={() => setSheetOpen(false)}
                  openCommand={() => {
                    setSheetOpen(false);
                    setTimeout(() => setCmdOpen(true), 250);
                  }}
                />
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
    <div className="flex flex-col h-full overflow-y-auto bg-[var(--bg)]">
      {/* Brand header — no italic magazine headline, just the lockup */}
      <div className="px-7 pt-7 pb-6">
        <Link href="/" onClick={close} className="inline-flex items-center gap-2.5">
          <span
            className="w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #B9E0DB, var(--accent) 70%)',
              boxShadow: 'inset 0 0 0 2px var(--bg), 0 2px 8px rgba(14,124,136,0.35)'
            }}
            aria-hidden
          />
          <span className="font-display text-xl tracking-tight">Aquamarine</span>
        </Link>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Private villas in Ayia Napa, Cyprus.
        </p>
      </div>

      {/* Primary navigation — clean sans, no numbering, subtle arrow */}
      <nav className="border-t border-[var(--line)]" aria-label="Primary">
        {navItems.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={close}
            className="group flex items-center justify-between px-7 py-4 border-b border-[var(--line)] hover:bg-[var(--surface-2)] transition-colors"
          >
            <span className="text-base font-medium text-[var(--fg)]">{n.label}</span>
            <ArrowRight
              size={15}
              weight="regular"
              className="text-[var(--fg-muted)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              aria-hidden
            />
          </Link>
        ))}
      </nav>

      {/* Villa mini-catalog */}
      <div className="px-7 pt-7 pb-6">
        <div className="label mb-4">Our villas</div>
        <ul className="space-y-3">
          {villas.map((v) => (
            <li key={v.slug}>
              <Link
                href={`/stays/${v.slug}`}
                onClick={close}
                className="group flex items-center gap-3 -mx-1 px-1 py-1 rounded-xl hover:bg-[var(--surface-2)] transition-colors"
              >
                <span className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                  <Image src={v.cover} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-[var(--fg)] truncate">
                    {v.name}
                  </span>
                  <span className="text-xs text-[var(--fg-muted)]">
                    Sleeps {v.sleeps} · from <span className="font-mono">€{v.priceFrom}</span>
                  </span>
                </span>
                <ArrowRight
                  size={14}
                  className="text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="px-7 py-6 border-t border-[var(--line)]">
        <div className="label mb-4">Get in touch</div>
        <ul className="space-y-2.5 text-sm">
          <li>
            <a href="tel:+35797494941" className="group flex items-center gap-3 text-[var(--fg-2)] hover:text-[var(--fg)]">
              <Phone size={15} weight="regular" className="text-[var(--accent)]" aria-hidden />
              <span className="font-mono">+357 97 494 941</span>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/35797494941"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[var(--fg-2)] hover:text-[var(--fg)]"
            >
              <ChatCircle size={15} weight="regular" className="text-[var(--accent)]" aria-hidden />
              <span>WhatsApp us</span>
            </a>
          </li>
          <li>
            <a
              href="mailto:info@aquamarine365.com"
              className="group flex items-center gap-3 text-[var(--fg-2)] hover:text-[var(--fg)]"
            >
              <Envelope size={15} weight="regular" className="text-[var(--accent)]" aria-hidden />
              <span>info@aquamarine365.com</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Footer: primary CTA + utility chips */}
      <div className="mt-auto px-7 py-6 border-t border-[var(--line)] space-y-3 bg-[var(--surface)]">
        <Button asChild size="lg" variant="sea" className="w-full">
          <Link href="/#book" onClick={close}>
            Check availability
            <ArrowRight size={15} weight="regular" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <button
            onClick={openCommand}
            className="flex-1 inline-flex items-center justify-between h-10 px-3 rounded-full border border-[var(--line)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition"
          >
            <span className="inline-flex items-center gap-2">
              <MagnifyingGlass size={13} weight="regular" />
              Search
            </span>
            <kbd className="font-mono text-[0.62rem] border border-[var(--line)] rounded px-1.5 py-0.5">⌘K</kbd>
          </button>
          <ThemeToggle className="flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
