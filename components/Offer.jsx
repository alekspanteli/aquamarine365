'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    window.location.href = `mailto:info@aquamarine365.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <section
      id="book"
      className="relative py-20 md:py-32 overflow-hidden isolate"
      style={{ background: 'linear-gradient(135deg, var(--color-ink-dark) 0%, #172327 100%)' }}
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

      <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center text-[var(--color-cream)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="label !text-[color:var(--color-terracotta-dark)] mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--color-terracotta-dark)]" />
            Direct offer · 08
          </div>
          <h2 className="text-[var(--color-cream)] max-w-[16ch]">
            Book direct. <em className="italic not-italic text-[color:var(--color-terracotta-dark)] italic">Get the week for the price of six nights.</em>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-cream)]/75 max-w-[52ch] leading-relaxed">
            Mention code{' '}
            <strong className="font-mono text-[color:var(--color-terracotta-dark)] bg-[var(--color-terracotta-dark)]/15 px-2.5 py-1 rounded tracking-wider">
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
                <Check size={18} className="text-[var(--color-terracotta-dark)] shrink-0" />
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
          className="bg-[var(--color-cream)] text-[var(--color-ink)] p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="label !text-[0.7rem]">Your name</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              className="h-12 px-4 rounded-xl border border-[var(--color-line)] bg-white focus:border-[var(--color-sea)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea)]/20 transition"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="label !text-[0.7rem]">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="jane@example.com"
              className="h-12 px-4 rounded-xl border border-[var(--color-line)] bg-white focus:border-[var(--color-sea)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea)]/20 transition"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="label !text-[0.7rem]">Dates &amp; guests</span>
            <input
              name="dates"
              required
              placeholder="e.g. 12–19 July, 4 adults"
              className="h-12 px-4 rounded-xl border border-[var(--color-line)] bg-white focus:border-[var(--color-sea)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sea)]/20 transition"
            />
          </label>
          <Button
            type="submit"
            variant="punch"
            size="lg"
            className="mt-2 bg-[var(--color-ink)] hover:bg-[var(--color-sea)]"
          >
            {status === 'sent' ? 'Opening your email…' : status === 'loading' ? 'Preparing…' : 'Check my dates'}
          </Button>
          <p className="text-xs text-[var(--color-muted)] text-center mt-1">
            We reply within one hour, 8am–10pm Cyprus time.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
