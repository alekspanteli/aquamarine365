'use client';

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
import { useVillas } from '@/components/VillasProvider';
import { useSiteSettings } from '@/components/SiteSettingsProvider';
import { Bed, House, Info, Question, Phone, Envelope, ChatCircle, Sun, Moon, Laptop } from '@phosphor-icons/react/dist/ssr';

export default function CommandPalette({ open, setOpen }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const villas = useVillas();
  const settings = useSiteSettings();

  const run = (fn) => () => {
    setOpen(false);
    setTimeout(fn, 50);
  };

  const go = (href) => run(() => router.push(href));

  const filter = (value, search) => {
    if (!search) return 1;
    const haystack = value.toLowerCase();
    const needle = search.trim().toLowerCase();
    if (!needle) return 1;
    if (haystack.includes(needle)) return 1;
    const words = haystack.split(/[\s,./_-]+/).filter(Boolean);
    const terms = needle.split(/\s+/).filter(Boolean);
    const allHit = terms.every((t) => words.some((w) => w.startsWith(t)));
    return allHit ? 0.6 : 0;
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} filter={filter}>
      <CommandInput placeholder="Search villas, sections, actions..." autoFocus />
      <CommandList>
        <CommandEmpty>No results. Try &quot;pool&quot; or &quot;sea&quot;.</CommandEmpty>

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
                  {v.location} - sleeps {v.sleeps} - from EUR {v.priceFrom}/night
                </div>
              </div>
              <kbd className="font-mono text-[0.65rem] text-[var(--fg-muted)]">Enter</kbd>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={go('/')}><House size={16} /> Home</CommandItem>
          <CommandItem onSelect={go('/#stays')}><Bed size={16} /> Browse stays</CommandItem>
          <CommandItem onSelect={go('/#why')}><Info size={16} /> Why Aquamarine</CommandItem>
          <CommandItem onSelect={go('/#how')}><Info size={16} /> How it works</CommandItem>
          <CommandItem onSelect={go('/#faq')}><Question size={16} /> FAQ</CommandItem>
          <CommandItem onSelect={go('/#book')}><Info size={16} /> {settings.nav.primaryCtaLabel}</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Contact">
          <CommandItem
            onSelect={run(() => window.location.assign(`tel:${settings.contact.phone.replace(/\s+/g, '')}`))}
          >
            <Phone size={16} /> Call {settings.contact.phone}
          </CommandItem>
          <CommandItem
            onSelect={run(() => window.location.assign(settings.contact.whatsappUrl))}
          >
            <ChatCircle size={16} /> WhatsApp
          </CommandItem>
          <CommandItem
            onSelect={run(() => window.location.assign(`mailto:${settings.contact.email}`))}
          >
            <Envelope size={16} /> Email {settings.contact.email}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Appearance">
          <CommandItem onSelect={run(() => setTheme('light'))}><Sun size={16} /> Light mode</CommandItem>
          <CommandItem onSelect={run(() => setTheme('dark'))}><Moon size={16} /> Dark mode</CommandItem>
          <CommandItem onSelect={run(() => setTheme('system'))}><Laptop size={16} /> Match system</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
