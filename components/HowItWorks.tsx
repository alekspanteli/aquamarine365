'use client';

import { motion } from 'framer-motion';
import { useSiteSettings } from '@/components/SiteSettingsProvider';

export default function HowItWorks() {
  const settings = useSiteSettings();

  return (
    <section id="how" className="py-20 md:py-32 bg-[var(--bg-2)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <div className="label label-accent mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {settings.howItWorks.eyebrow}
          </div>
          <h2>
            {settings.howItWorks.title}{' '}
            <span className="text-[var(--accent)]">{settings.howItWorks.highlight}</span>
          </h2>
        </motion.div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {settings.howItWorks.steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.span
                whileHover={{ scale: 1.06, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--fg)] text-[var(--bg)] font-display text-xl mb-5 shadow-lg"
              >
                {step.number}
              </motion.span>
              {i < settings.howItWorks.steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className="hidden lg:block absolute top-7 left-[60px] right-[-32px] h-px bg-gradient-to-r from-[var(--line)] to-transparent origin-left"
                  aria-hidden
                />
              )}
              <h3 className="font-display text-xl mb-2">{step.title}</h3>
              <p className="text-[var(--fg-2)] leading-relaxed text-[0.95rem]">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
