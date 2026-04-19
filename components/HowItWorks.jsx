'use client';

import { motion } from 'framer-motion';

const steps = [
  { n: '1', t: 'Tell us your dates', d: 'Pick a villa or let us suggest one. We confirm availability within the hour.' },
  { n: '2', t: 'Lock it in', d: '30% holds the keys. Balance two weeks before arrival. Free cancel up to 30 days out.' },
  { n: '3', t: 'Arrive, walk in', d: 'Self check-in with a code or meet us at the door. Transfer, stocking, chef bookable.' },
  { n: '4', t: 'Stay in touch', d: 'One WhatsApp thread for the trip. Plumber, sitter, 9pm table? Message us.' }
];

export default function HowItWorks() {
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
            How it works · 05
          </div>
          <h2>
            Four steps. <em className="italic text-[var(--accent)]">That&apos;s the whole thing.</em>
          </h2>
        </motion.div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
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
                {s.n}
              </motion.span>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className="hidden lg:block absolute top-7 left-[60px] right-[-32px] h-px bg-gradient-to-r from-[var(--line)] to-transparent origin-left"
                  aria-hidden
                />
              )}
              <h3 className="font-display text-xl mb-2">{s.t}</h3>
              <p className="text-[var(--fg-2)] leading-relaxed text-[0.95rem]">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
