'use client';

import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react/dist/ssr';

const rows = [
  { label: 'Booking fees', direct: '€0', other: '€120 – €240' },
  { label: 'Who cleans', direct: 'Our local team', other: 'Third-party contractor' },
  { label: 'Who answers at 10pm', direct: 'A person on the island', other: 'Overseas chat bot' },
  { label: 'Cancellation', direct: 'Free to 30 days out', other: 'Strict, partial refund' },
  { label: 'Keys', direct: 'Code or hand-delivered', other: 'Often a lockbox' },
  { label: 'Fridge pre-stock', direct: 'On request, at cost', other: 'Not offered' },
  { label: 'Same night room switch', direct: 'Free when available', other: 'Not available' }
];

export default function Compare() {
  return (
    <section className="py-20 md:py-32">
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
            The honest comparison · 04
          </div>
          <h2>
            Book direct. <em className="italic">Here&apos;s what changes.</em>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-2)] leading-relaxed">
            Same villa either way. Different experience — and a different total at checkout.
          </p>
        </motion.div>

        <div
          className="rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-sm"
          role="table"
          aria-label="Aquamarine direct vs booking platforms"
        >
          <div
            className="hidden md:grid grid-cols-[1.2fr_1.3fr_1fr] gap-4 px-8 py-4 border-b border-[var(--line)] bg-[var(--surface-2)] label"
            role="row"
          >
            <div role="columnheader">Comparison</div>
            <div role="columnheader" className="label-accent flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_18%,transparent)]" />
              Aquamarine direct
            </div>
            <div role="columnheader">Airbnb / Booking</div>
          </div>

          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              role="row"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid md:grid-cols-[1.2fr_1.3fr_1fr] gap-2 md:gap-4 px-5 md:px-8 py-4 md:py-5 border-b border-[var(--line)] last:border-b-0 items-center"
            >
              <div
                className="font-medium text-[var(--fg)] md:text-base text-[0.68rem] md:tracking-normal md:normal-case md:font-medium uppercase tracking-wider font-mono md:font-sans text-[var(--fg-muted)] md:text-[var(--fg)]"
                role="cell"
              >
                {r.label}
              </div>
              <div
                className="inline-flex items-center gap-2.5 text-[var(--fg)] font-medium"
                role="cell"
              >
                <Check size={16} className="text-[var(--accent)] shrink-0" />
                <span className="md:before:hidden before:content-['DIRECT__'] before:font-mono before:text-[0.6rem] before:text-[var(--accent)] before:tracking-widest md:before:mr-0">
                  {r.direct}
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2.5 text-[var(--fg-muted)] line-through decoration-[color:var(--fg-muted)]/40"
                role="cell"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)]/40 shrink-0" />
                {r.other}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
