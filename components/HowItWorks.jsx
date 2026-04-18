'use client';

import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const steps = [
  {
    n: '1',
    t: 'Tell us your dates',
    d: 'Pick a villa or let us suggest one. We confirm availability within the hour.'
  },
  {
    n: '2',
    t: 'Lock it in',
    d: '30% holds the keys. Balance two weeks before arrival. Free cancellation up to 30 days out.'
  },
  {
    n: '3',
    t: 'Arrive, walk in',
    d: 'Self check-in with a code, or meet us at the door. Fridge stocking and airport transfer bookable in advance.'
  },
  {
    n: '4',
    t: 'Stay in touch',
    d: 'One WhatsApp thread for the whole trip. Need a plumber, a sitter, or a 9pm table? Message us.'
  }
];

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">How it works</p>
          <h2>Four steps. That&apos;s the whole process.</h2>
        </motion.div>

        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className={styles.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className={styles.num}
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {s.n}
              </motion.span>
              {i < steps.length - 1 && (
                <motion.div
                  className={styles.line}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  aria-hidden
                />
              )}
              <h3 className={styles.title}>{s.t}</h3>
              <p className={styles.desc}>{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
