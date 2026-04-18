'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

const proof = [
  { k: '4.9', v: 'Guest rating · 300+ stays' },
  { k: '12 yrs', v: 'Local in Ayia Napa' },
  { k: '0%', v: 'Booking fees, direct' },
  { k: '24/7', v: 'On-island support' }
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className={styles.hero}>
      <motion.div style={{ y, scale, opacity }} className={styles.bg} aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className={styles.scrim} />
      </motion.div>

      <div className={`container ${styles.inner}`}>
        <motion.p
          className="eyebrow eyebrow--light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ayia Napa · Cyprus
        </motion.p>

        <motion.h1
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {['Villas in Ayia Napa,'].map((line, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              {line}
            </motion.span>
          ))}
          <motion.em
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'block' }}
          >
            run like a five-star hotel.
          </motion.em>
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Private seafront homes, cleaned before every arrival, stocked on request, and backed by a real human on call 24/7. Book direct — no platform fees.
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link href="#book" className="btn btn--light btn--lg">
            Check availability
            <Arrow />
          </Link>
          <Link href="#stays" className={`btn btn--lg ${styles.ghost}`}>
            See the homes
          </Link>
        </motion.div>

        <motion.ul
          className={styles.proof}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          aria-label="At a glance"
        >
          {proof.map((p) => (
            <motion.li
              key={p.k}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <strong>{p.k}</strong>
              <span>{p.v}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden
      >
        <span>Scroll</span>
        <div className={styles.line}>
          <motion.div
            className={styles.dot}
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
