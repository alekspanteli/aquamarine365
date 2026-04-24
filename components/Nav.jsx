'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { List, MagnifyingGlass, ArrowRight, X } from '@phosphor-icons/react/dist/ssr';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

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
  const [activeSection, setActiveSection] = useState('');

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

  // Highlight the nav link whose section is currently on-screen.
  // Runs only on the homepage (where the hash targets exist).
  useEffect(() => {
    const ids = navItems.map((n) => n.href.split('#')[1]).filter(Boolean);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
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
          <Logo className="shrink-0" />

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
            {navItems.slice(0, 3).map((n) => {
              const sectionId = n.href.split('#')[1];
              const isActive = sectionId && sectionId === activeSection;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-[0.93rem] transition-colors ${
                    isActive
                      ? 'text-[var(--fg)] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[var(--accent)] after:rounded-full'
                      : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
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
              <SheetContent
                side="right"
                hideClose
                className="flex flex-col gap-0 p-0 w-full max-w-[380px]"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Primary navigation. Browse villas, learn how we work, and get in touch.
                </SheetDescription>
                <DrawerContent close={() => setSheetOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </>
  );
}

function DrawerContent({ close }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[var(--bg)]">
      {/* Brand header — logo + explicit close. Replaces the default Sheet X
          so the close control is visually discoverable on touch. */}
      <div className="px-7 pt-7 pb-6 flex items-center justify-between">
        <Logo onNavigate={close} />
        <SheetClose asChild>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--surface-2)] transition"
          >
            <X size={16} weight="regular" />
          </button>
        </SheetClose>
      </div>

      {/* Primary navigation — the only thing in the drawer */}
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
    </div>
  );
}
