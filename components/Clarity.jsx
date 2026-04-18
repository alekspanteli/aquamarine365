'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Clarity.module.css';

const pills = [
  'Seafront & countryside villas',
  'Sleeps 2–10',
  '5–15 min to the beach',
  'Long-stay rates available'
];

export default function Clarity() {
  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">What we do</p>
          <h2>We help travelers have the best week of their year — in homes we actually run.</h2>
          <p className="lede">
            Aquamarine owns and manages a small collection of villas and suites in Ayia Napa. We handle the property ourselves, so check-in is smooth, the place is spotless, and if anything&apos;s off, one person answers the phone and fixes it.
          </p>
          <ul className={styles.pills}>
            {pills.map((p) => (
              <motion.li
                key={p}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={styles.media}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.imgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80"
              alt="Mediterranean villa with pool at dusk"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.badgeRow}>
              <span className={styles.dot} aria-hidden />
              <span>Available this summer</span>
            </div>
            <strong>3 private villas · 19 beds total</strong>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
