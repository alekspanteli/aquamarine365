'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
import { villas } from '@/data/villas';
import { Bed, Home, Info, HelpCircle, Phone, Mail, MessageCircle, Sun, Moon, Laptop2 } from 'lucide-react';

export function CommandPaletteTrigger({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="hidden md:inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-full border border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition text-sm bg-[var(--surface)]"
      aria-label="Open command palette"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="mr-8">Search</span>
      <kbd className="font-mono text-[0.68rem] px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--bg)]">⌘K</kbd>
    </button>
  );
}

export default function CommandPalette({ open, setOpen }) {
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const run = (fn) => () => {
    setOpen(false);
    setTimeout(fn, 50);
  };

  const go = (href) => run(() => router.push(href));

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search villas, sections, actions…" autoFocus />
      <CommandList>
        <CommandEmpty>No results. Try &ldquo;pool&rdquo; or &ldquo;sea&rdquo;.</CommandEmpty>

        <CommandGroup heading="Villas">
          {villas.map((v) => (
            <CommandItem
              key={v.slug}
              value={`${v.name} ${v.location} ${v.tagline}`}
              onSelect={go(`/stays/${v.slug}`)}
            >
              <Bed size={16} className="text-[var(--accent)]" />
              <div className="flex-1">
                <div className="font-medium">{v.name}</div>
                <div className="text-xs text-[var(--fg-muted)]">
                  {v.location} · sleeps {v.sleeps} · from €{v.priceFrom}/night
                </div>
              </div>
              <kbd className="font-mono text-[0.65rem] text-[var(--fg-muted)]">↵</kbd>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={go('/')}><Home size={16} /> Home</CommandItem>
          <CommandItem onSelect={go('/#stays')}><Bed size={16} /> Browse stays</CommandItem>
          <CommandItem onSelect={go('/#why')}><Info size={16} /> Why Aquamarine</CommandItem>
          <CommandItem onSelect={go('/#how')}><Info size={16} /> How it works</CommandItem>
          <CommandItem onSelect={go('/#faq')}><HelpCircle size={16} /> FAQ</CommandItem>
          <CommandItem onSelect={go('/#book')}><Info size={16} /> Check availability</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Contact">
          <CommandItem
            onSelect={run(() => (window.location.href = 'tel:+35797494941'))}
          >
            <Phone size={16} /> Call +357 97 494 941
          </CommandItem>
          <CommandItem
            onSelect={run(() => (window.location.href = 'https://wa.me/35797494941'))}
          >
            <MessageCircle size={16} /> WhatsApp
          </CommandItem>
          <CommandItem
            onSelect={run(() => (window.location.href = 'mailto:info@aquamarine365.com'))}
          >
            <Mail size={16} /> Email info@aquamarine365.com
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Appearance">
          <CommandItem onSelect={run(() => setTheme('light'))}><Sun size={16} /> Light mode</CommandItem>
          <CommandItem onSelect={run(() => setTheme('dark'))}><Moon size={16} /> Dark mode</CommandItem>
          <CommandItem onSelect={run(() => setTheme('system'))}><Laptop2 size={16} /> Match system</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
