'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.css';

const quotes = [
  {
    q: 'Check-in took ninety seconds. The fridge had the groceries we asked for. The sea was fifty steps from the door. I don\'t know what else you want from a holiday.',
    name: 'Marta K.',
    meta: 'Stockholm · Ocean Dreams · 7 nights'
  },
  {
    q: 'Pool heater broke at 10pm. Someone turned up by 8am with a replacement part. That\'s the difference versus every other rental I\'ve booked.',
    name: 'James R.',
    meta: 'London · Tropicana · 10 nights'
  },
  {
    q: 'Brought my parents, my sister, her kids and our dog. Five bathrooms, one bill, zero arguments. We\'re rebooking for next summer.',
    name: 'Elena D.',
    meta: 'Athens · Valerian Palm · 14 nights'
  },
  {
    q: 'They messaged me the morning of arrival with the forecast, a restaurant list, and a note that the road to the villa had fresh tarmac. That\'s hospitality.',
    name: 'Lucas M.',
    meta: 'Paris · Ocean Dreams · 5 nights'
  }
];

const trust = [
  { k: '4.9 / 5', v: 'average rating' },
  { k: '300+', v: 'stays hosted' },
  { k: '68%', v: 'return or referred' },
  { k: 'CY-DMT', v: 'licensed operator' }
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
    <section className="section section--alt" id="guests">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">What guests say</p>
          <h2>Real reviews from real stays.</h2>
        </motion.div>

        <div
          className={styles.stage}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg className={styles.quoteMark} viewBox="0 0 64 48" aria-hidden>
            <path
              d="M0 48V28C0 12.5 10 2 24 0v10c-6 2-10 7-10 14h10v24H0zm40 0V28C40 12.5 50 2 64 0v10c-6 2-10 7-10 14h10v24H40z"
              fill="currentColor"
            />
          </svg>

          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              className={styles.figure}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className={styles.quote}>&ldquo;{quotes[i].q}&rdquo;</blockquote>
              <figcaption className={styles.cite}>
                <strong>{quotes[i].name}</strong>
                <span>{quotes[i].meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
            {quotes.map((_, n) => (
              <button
                key={n}
                role="tab"
                aria-selected={n === i}
                aria-label={`Show testimonial ${n + 1}`}
                className={`${styles.dot} ${n === i ? styles.dotActive : ''}`}
                onClick={() => setI(n)}
              >
                {n === i && (
                  <motion.span
                    className={styles.bar}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
                    key={`${n}-${paused}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.trust}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {trust.map((t) => (
            <motion.div
              key={t.k}
              className={styles.trustItem}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <strong>{t.k}</strong>
              <span>{t.v}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
