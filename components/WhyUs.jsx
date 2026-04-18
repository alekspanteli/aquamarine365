'use client';

import { motion } from 'framer-motion';
import styles from './WhyUs.module.css';

const reasons = [
  {
    n: '01',
    t: 'We answer the phone.',
    d: 'One local team, on the island, 24/7. Not an overseas call centre. Average response: under 10 minutes.'
  },
  {
    n: '02',
    t: 'No booking fees.',
    d: 'Book direct and skip the 15–20% platform markup. Same homes, lower total price, no checkout surprises.'
  },
  {
    n: '03',
    t: 'Hotel-grade turnover.',
    d: 'Every villa is inspected against a 42-point checklist before you arrive. Fresh linens, stocked basics, working Wi-Fi — verified.'
  },
  {
    n: '04',
    t: 'We know Ayia Napa.',
    d: 'Twelve years here. We\'ll tell you which beach is quiet on a Saturday and which taverna is worth the drive.'
  }
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function WhyUs() {
  return (
    <section className="section section--alt" id="why">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Why Aquamarine</p>
          <h2>Fewer surprises. Better holidays.</h2>
          <p className="section__sub">
            We don&apos;t resell other people&apos;s listings. We own the operation — which is why it actually works.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reasons.map((r) => (
            <motion.article key={r.n} className={styles.card} variants={item}>
              <div className={styles.num}>{r.n}</div>
              <h3 className={styles.title}>{r.t}</h3>
              <p className={styles.desc}>{r.d}</p>
              <div className={styles.glow} aria-hidden />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
