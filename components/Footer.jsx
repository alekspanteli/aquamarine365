import Link from 'next/link';
import { InstagramLogo, Envelope, ChatCircle } from '@phosphor-icons/react/dist/ssr';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--color-ink-dark)] text-[var(--color-cream)]/75 pt-20 pb-7">
      <div className="container-x grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 pb-12">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #B9E0DB, var(--color-aqua) 70%)',
                boxShadow: 'inset 0 0 0 2px #0a1721, 0 2px 8px rgba(127,201,184,0.35)'
              }}
              aria-hidden
            />
            <span className="font-display text-2xl text-white">Aquamarine</span>
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-cream)]/50 ml-1">365</span>
          </div>
          <p className="mt-4 text-[var(--color-cream)]/60 max-w-[32ch] leading-relaxed">
            Ayia Napa villas &amp; suites, managed by the people who own them.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: InstagramLogo, href: 'https://instagram.com', label: 'Instagram' },
              { Icon: ChatCircle, href: 'https://wa.me/35797494941', label: 'WhatsApp' },
              { Icon: Envelope, href: 'mailto:info@aquamarine365.com', label: 'Email' }
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
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
            <a href="tel:+35797494941" className="font-mono hover:text-white">+357 97 494 941</a>
          </p>
          <p className="text-sm mt-1">
            <a href="mailto:info@aquamarine365.com" className="hover:text-white">info@aquamarine365.com</a>
          </p>
          <p className="text-sm mt-2 leading-relaxed">
            61 Tefkrou Anthia
            <br />
            Ayia Napa 5330, Cyprus
          </p>
        </div>

        <div>
          <h4 className="label !text-white/80 mb-3">Stays</h4>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/stays/ocean-dreams-suites" className="hover:text-white">Ocean Dreams Suites</Link></li>
            <li><Link href="/stays/dream-tropicana-villa" className="hover:text-white">Dream Tropicana Villa</Link></li>
            <li><Link href="/stays/valerian-palm-villa" className="hover:text-white">Valerian Palm Villa</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="label !text-white/80 mb-3">Trust</h4>
          <ul className="space-y-1.5 text-sm text-[var(--color-cream)]/60">
            <li>Licensed CY-DMT 2024</li>
            <li>GDPR compliant</li>
            <li>Secure payments · Stripe</li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col md:flex-row justify-between gap-3 pt-6 border-t border-white/10 text-xs text-[var(--color-cream)]/45 font-mono">
        <small>© {new Date().getFullYear()} Aquamarine Holiday Rentals. All rights reserved.</small>
        <small className="flex gap-3">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">House rules</a>
        </small>
      </div>
    </footer>
  );
}
