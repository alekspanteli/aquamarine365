'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const quotes = [
  { q: "Check-in took ninety seconds. The fridge had the groceries we asked for. The sea was fifty steps from the door. I don't know what else you want from a holiday.", name: 'Marta K.', meta: 'Stockholm · Ocean Dreams · 7 nights' },
  { q: "Pool heater broke at 10pm. Someone turned up by 8am with a replacement part. That's the difference versus every other rental I've booked.", name: 'James R.', meta: 'London · Tropicana · 10 nights' },
  { q: "Brought my parents, my sister, her kids and our dog. Five bathrooms, one bill, zero arguments. We're rebooking for next summer.", name: 'Elena D.', meta: 'Athens · Valerian Palm · 14 nights' },
  { q: "They messaged me the morning of arrival with the forecast, a restaurant list, and a note that the road to the villa had fresh tarmac. That's hospitality.", name: 'Lucas M.', meta: 'Paris · Ocean Dreams · 5 nights' }
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="guests" className="py-20 md:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <div className="label label-accent mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            What guests say
          </div>
          <h2>
            Real reviews from <span className="text-[var(--accent)]">real stays.</span>
          </h2>
        </motion.div>

        <div
          className="relative bg-[var(--surface)] border border-[var(--line)] rounded-3xl px-6 md:px-14 pt-14 pb-10 max-w-4xl mx-auto overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <svg className="absolute top-6 left-6 w-12 h-auto text-[var(--punch-soft)]" viewBox="0 0 64 48" aria-hidden>
            <path
              d="M0 48V28C0 12.5 10 2 24 0v10c-6 2-10 7-10 14h10v24H0zm40 0V28C40 12.5 50 2 64 0v10c-6 2-10 7-10 14h10v24H40z"
              fill="currentColor"
            />
          </svg>

          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              id={`testimonial-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`testimonial-tab-${i}`}
              aria-live="polite"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5 min-h-[200px]"
            >
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, n) => (
                  <svg key={n} width="18" height="18" viewBox="0 0 24 24" fill="var(--punch)" aria-hidden>
                    <path d="m12 2 2.9 6.9L22 9.6l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.6L2 9.6l7.1-.7L12 2Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl leading-tight m-0">
                &ldquo;{quotes[i].q}&rdquo;
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <strong className="text-[var(--fg)] font-medium">{quotes[i].name}</strong>
                <span className="text-sm text-[var(--fg-muted)] font-mono">{quotes[i].meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div role="tablist" aria-label="Testimonials" className="mt-8 pt-6 border-t border-[var(--line)] flex gap-3">
            {quotes.map((_, n) => (
              <button
                key={n}
                id={`testimonial-tab-${n}`}
                onClick={() => setI(n)}
                aria-selected={n === i}
                aria-controls={`testimonial-panel-${n}`}
                aria-label={`Show testimonial ${n + 1}`}
                role="tab"
                tabIndex={n === i ? 0 : -1}
                className={`relative h-1.5 flex-1 max-w-[64px] rounded-full overflow-hidden transition-colors ${
                  n === i ? 'bg-[var(--accent)]/25' : 'bg-[var(--fg-muted)]/30 hover:bg-[var(--fg-muted)]/50'
                }`}
              >
                {n === i && (
                  <motion.span
                    key={`${n}-${paused}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-0 bg-[var(--accent)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <TrustPanel />
      </div>
    </section>
  );
}

/**
 * Unified trust panel. Four stats on one horizontal rule, a short
 * provenance line, and a quiet list of representative guest cities —
 * static, informational, no more endless marquee.
 */
function TrustPanel() {
  const stats = [
    { value: '4.9', unit: '/5', label: 'Average rating' },
    { value: '300', unit: '+', label: 'Stays hosted' },
    { value: '68', unit: '%', label: 'Return or referred' },
    { value: '12', unit: ' yrs', label: 'Operating in Ayia Napa' }
  ];
  const cities = [
    'London', 'Stockholm', 'Paris', 'Berlin', 'Athens', 'Milan', 'Amsterdam',
    'Zürich', 'Dublin', 'Madrid', 'Copenhagen', 'Vienna'
  ];

  return (
    <div className="mt-14 rounded-2xl bg-[var(--surface)] border border-[var(--line)] overflow-hidden">
      <dl className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              'flex flex-col gap-1.5 p-5 md:p-7',
              // Inner dividers — right + bottom — applied only where needed on each breakpoint
              i % 2 === 0 && 'border-r border-[var(--line)] md:border-r md:last:border-r-0',
              i < 2 && 'border-b border-[var(--line)] md:border-b-0',
              i === 2 && 'md:border-r border-[var(--line)]',
              i !== 3 && 'md:border-r md:border-[var(--line)]'
            )}
          >
            <dt className="label !text-[0.65rem]">{s.label}</dt>
            <dd className="font-display font-medium tracking-tight leading-none flex items-baseline gap-0.5 text-[clamp(1.75rem,6vw,2.1rem)]">
              <span>{s.value}</span>
              <span className="text-[var(--fg-muted)] font-normal text-[0.65em]">{s.unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-[var(--line)] px-5 md:px-7 py-4 flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--bg-2)]">
        <span className="label !text-[0.62rem]">Licensed CY-DMT · Booked this year from</span>
        <span className="text-sm text-[var(--fg-2)] leading-relaxed">
          {cities.slice(0, 5).map((c, i) => (
            <span key={c}>
              <span className="font-display">{c}</span>
              {i < 4 && <span className="text-[var(--fg-muted)] mx-1.5">·</span>}
            </span>
          ))}
          <span className="text-[var(--fg-muted)] ml-1.5">
            &amp; {cities.length - 5} more
          </span>
        </span>
      </div>
    </div>
  );
}
