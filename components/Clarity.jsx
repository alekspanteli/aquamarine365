'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/components/SiteSettingsProvider';

export default function Clarity() {
  const settings = useSiteSettings();

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
            {settings.clarity.eyebrow}
          </div>
          <h2 className="max-w-[18ch]">
            {settings.clarity.title}{' '}
            <span className="text-[var(--accent)]">{settings.clarity.highlight}</span>{' '}
            {settings.clarity.titleSuffix}
          </h2>
          <p className="mt-6 text-lg text-[var(--fg-2)] max-w-[58ch] leading-relaxed">
            {settings.clarity.body}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {settings.clarity.pills.map((pill) => (
              <li
                key={pill}
                className="text-sm font-mono uppercase tracking-wider px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
              >
                {pill}
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
              src={settings.clarity.image}
              alt={settings.clarity.imageAlt}
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
              {settings.clarity.availabilityLabel}
            </div>
            <strong className="font-display text-base leading-tight text-[var(--fg)] block">
              {settings.clarity.availabilityText}
            </strong>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
