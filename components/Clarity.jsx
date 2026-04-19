'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const pills = [
  'Seafront & countryside',
  'Sleeps 2–10',
  '5–15 min to beach',
  'Long-stay rates'
];

export default function Clarity() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container-x grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="label label-accent mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            What we do · 01
          </div>
          <h2 className="max-w-[18ch]">
            We help travelers have <em className="italic text-[var(--accent)]">the best week</em> of their year — in homes we actually run.
          </h2>
          <p className="mt-6 text-lg text-[var(--fg-2)] max-w-[58ch] leading-relaxed">
            Aquamarine owns and manages a small collection of villas and suites in Ayia Napa. We handle the property ourselves, so check-in is smooth, the place is spotless, and if anything&apos;s off, one person answers the phone and fixes it.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {pills.map((p) => (
              <li
                key={p}
                className="text-sm font-mono uppercase tracking-wider px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
              >
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5]"
        >
          <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(15,29,33,0.18)]">
            <Image
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=75"
              alt="Mediterranean villa with pool at dusk"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-6 left-4 md:-left-6 bg-[var(--surface)] border border-[var(--line)] rounded-2xl px-5 py-4 shadow-xl max-w-[240px] z-10"
          >
            <div className="label flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" />
              Available this summer
            </div>
            <strong className="font-display text-base leading-tight text-[var(--fg)] block">
              3 private villas · 19 beds total
            </strong>
          </motion.div>

          {/* Editorial figure caption */}
          <div className="hidden md:block absolute -right-4 top-6 -rotate-90 origin-top-right label !text-[var(--fg-muted)]">
            Fig. 01 — Courtyard, dusk
          </div>
        </motion.div>
      </div>
    </section>
  );
}
