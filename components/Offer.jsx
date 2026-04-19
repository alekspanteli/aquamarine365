'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/skeleton';

export default function Offer() {
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent('Booking enquiry — DIRECT7');
    const body = encodeURIComponent(
      `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nDates & guests: ${form.get('dates')}\n\nCode: DIRECT7`
    );
    toast.success('Opening your email client', {
      description: "We'll reply within an hour, 8am–10pm Cyprus time."
    });
    window.location.href = `mailto:info@aquamarine365.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <section
      id="book"
      className="relative py-20 md:py-32 overflow-hidden isolate"
      style={{ background: 'linear-gradient(135deg, var(--color-ink-dark) 0%, #0E3A44 100%)' }}
    >
      <div
        aria-hidden
        className="absolute -z-10 opacity-60"
        style={{
          inset: 0,
          background:
            'radial-gradient(500px 300px at 15% 20%, color-mix(in srgb, var(--color-aqua) 20%, transparent), transparent 70%), radial-gradient(600px 400px at 85% 80%, color-mix(in srgb, var(--color-terracotta-dark) 20%, transparent), transparent 70%)'
        }}
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="label mb-4 flex items-center gap-2" style={{ color: 'var(--color-terracotta-dark)' }}>
            <span className="w-6 h-px" style={{ background: 'var(--color-terracotta-dark)' }} />
            Direct offer · 08
          </div>
          <h2 className="max-w-[18ch] !text-[var(--color-cream)]">
            <span className="block">Book direct.</span>
            <span
              className="block italic font-light"
              style={{ color: 'var(--color-terracotta-dark)' }}
            >
              Get the week for six.
            </span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-cream)]/80 max-w-[52ch] leading-relaxed">
            Mention code{' '}
            <strong
              className="font-mono px-2.5 py-1 rounded tracking-wider"
              style={{
                color: 'var(--color-terracotta-dark)',
                background: 'color-mix(in srgb, var(--color-terracotta-dark) 15%, transparent)'
              }}
            >
              DIRECT7
            </strong>{' '}
            when you enquire. Valid on stays of 7+ nights, May through October. No platform fees, ever.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {[
              'One-hour reply, 8am–10pm Cyprus time',
              '30% deposit · free cancellation 30 days out',
              'Airport pickup & grocery stocking on request'
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[var(--color-cream)]/90">
                <Check size={18} className="shrink-0" style={{ color: 'var(--color-terracotta-dark)' }} />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-[var(--color-cream)] p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4"
          style={{ color: 'var(--color-ink)' }}
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offer-name">Your name</Label>
            <Input id="offer-name" name="name" required autoComplete="name" placeholder="Jane Doe" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offer-email">Email</Label>
            <Input id="offer-email" name="email" type="email" required autoComplete="email" placeholder="jane@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offer-dates">Dates &amp; guests</Label>
            <Input id="offer-dates" name="dates" required placeholder="e.g. 12–19 July, 4 adults" />
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-2 bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-aegean)]"
          >
            {status === 'loading' || status === 'sent' ? (
              <>
                <Spinner size={14} />
                {status === 'sent' ? 'Opening your email…' : 'Preparing…'}
              </>
            ) : (
              'Check my dates'
            )}
          </Button>
          <p className="text-xs text-[var(--color-muted)] text-center mt-1">
            We reply within one hour, 8am–10pm Cyprus time.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
