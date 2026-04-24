'use client';

import Link from 'next/link';
import { InstagramLogo, Envelope, ChatCircle } from '@phosphor-icons/react/dist/ssr';
import { useSiteSettings } from '@/components/SiteSettingsProvider';
import { useVillas } from '@/components/VillasProvider';
import Logo from './Logo';

export default function Footer() {
  const settings = useSiteSettings();
  const villas = useVillas();

  return (
    <footer id="contact" className="bg-[var(--color-ink-dark)] text-[var(--color-cream)]/75 pt-20 pb-7">
      <div className="container-x grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 pb-12">
        <div className="text-white">
          <Logo invert className="text-white" />
          <p className="mt-4 text-[var(--color-cream)]/60 max-w-[32ch] leading-relaxed">
            {settings.footer.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: InstagramLogo, href: settings.contact.instagramUrl, label: 'Instagram' },
              { Icon: ChatCircle, href: settings.contact.whatsappUrl, label: 'WhatsApp' },
              { Icon: Envelope, href: `mailto:${settings.contact.email}`, label: 'Email' }
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-[var(--color-cream)]/70 hover:bg-[var(--color-aqua)] hover:border-[var(--color-aqua)] hover:text-[var(--color-ink-dark)] transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="label !text-white/80 mb-3">Contact</h4>
          <p className="text-sm">
            <a href={`tel:${settings.contact.phone.replace(/\s+/g, '')}`} className="font-mono hover:text-white">
              {settings.contact.phone}
            </a>
          </p>
          <p className="text-sm mt-1">
            <a
              href={`mailto:${settings.contact.email}`}
              className="hover:text-white"
              aria-label={`Email ${settings.contact.email}`}
            >
              {settings.contact.email}
            </a>
          </p>
          <p className="text-sm mt-2 leading-relaxed">
            {settings.contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div>
          <h4 className="label !text-white/80 mb-3">Stays</h4>
          <ul className="space-y-1.5 text-sm">
            {villas.map((villa) => (
              <li key={villa.slug}>
                <Link href={`/stays/${villa.slug}`} className="hover:text-white">
                  {villa.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="label !text-white/80 mb-3">Trust</h4>
          <ul className="space-y-1.5 text-sm text-[var(--color-cream)]/60">
            {settings.footer.trustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col md:flex-row justify-between gap-3 pt-6 border-t border-white/10 text-xs text-[var(--color-cream)]/45 font-mono">
        <small>&copy; {new Date().getFullYear()} Aquamarine Holiday Rentals. All rights reserved.</small>
        <small className="flex gap-3">
          <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/legal/cookies" className="hover:text-white">Cookies</Link>
          <Link href="/legal/terms" className="hover:text-white">Terms</Link>
        </small>
      </div>
    </footer>
  );
}
