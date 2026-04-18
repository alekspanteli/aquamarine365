'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Offer.module.css';

export default function Offer() {
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent('Booking enquiry — DIRECT7');
    const body = encodeURIComponent(
      `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nDates & guests: ${form.get('dates')}\n\nCode: DIRECT7`
    );
    window.location.href = `mailto:info@aquamarine365.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <section className="section section--dark" id="book">
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow eyebrow--light">Direct booking offer</p>
          <h2>Book direct. Get the week for the price of six nights.</h2>
          <p className={styles.sub}>
            Mention code <strong className={styles.code}>DIRECT7</strong> when you enquire. Valid on stays of 7+ nights, May through October. No platform fees, ever.
          </p>

          <ul className={styles.perks}>
            <li><Check /> One-hour reply, 8am–10pm Cyprus time</li>
            <li><Check /> 30% deposit · free cancellation 30 days out</li>
            <li><Check /> Airport pickup &amp; grocery stocking on request</li>
          </ul>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <label>
            <span>Your name</span>
            <input name="name" required placeholder="Jane Doe" autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required placeholder="jane@example.com" autoComplete="email" />
          </label>
          <label>
            <span>Dates &amp; guests</span>
            <input name="dates" required placeholder="e.g. 12–19 July, 4 adults" />
          </label>
          <motion.button
            type="submit"
            className="btn btn--primary btn--lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ background: status === 'sent' ? 'var(--accent)' : '' }}
          >
            {status === 'sent' ? 'Opening your email…' : status === 'loading' ? 'Preparing…' : 'Check my dates'}
          </motion.button>
          <p className="micro">We reply within one hour, 8am–10pm Cyprus time.</p>
        </motion.form>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="#d4a86a"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
