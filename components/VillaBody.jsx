'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import VillaGallery from './VillaGallery';
import styles from './VillaBody.module.css';

export default function VillaBody({ villa }) {
  return (
    <>
      <section className={styles.top}>
        <div className={`container ${styles.topInner}`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/#stays" className={styles.back}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All stays
            </Link>
            <p className={`eyebrow ${styles.loc}`}>{villa.location}</p>
            <h1 className={styles.title}>{villa.name}</h1>
            <p className={styles.tag}>{villa.tagline}</p>

            <ul className={styles.quick}>
              {villa.specs.map((s) => (
                <li key={s.label}>
                  <span>{s.label}</span>
                  <strong>{s.value}</strong>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className={styles.galleryWrap}>
        <div className={`container`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <VillaGallery images={villa.gallery} name={villa.name} />
          </motion.div>
        </div>
      </section>

      <section className={styles.detail}>
        <div className={`container ${styles.detailGrid}`}>
          <motion.div
            className={styles.col}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.h2}>The villa</h2>
            <p className={styles.summary}>{villa.summary}</p>

            <h3 className={styles.h3}>What stands out</h3>
            <ul className={styles.highlights}>
              {villa.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  dangerouslySetInnerHTML={{ __html: h }}
                />
              ))}
            </ul>

            <h3 className={styles.h3}>Amenities</h3>
            <ul className={styles.amenities}>
              {villa.amenities.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {a}
                </motion.li>
              ))}
            </ul>

            <h3 className={styles.h3}>Location</h3>
            <div className={styles.map} aria-label="Map placeholder">
              <div className={styles.mapDot} />
              <span className={styles.mapLabel}>Ayia Napa, Cyprus</span>
            </div>
            <p className={styles.note}>
              We share the exact address and a welcome pack after booking. Airport transfer (LCA, 45 min) from €65.
            </p>
          </motion.div>

          <aside className={styles.sidebar}>
            <motion.div
              className={styles.book}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={styles.priceRow}>
                <span className={styles.from}>From</span>
                <strong className={styles.price}>€{villa.priceFrom}</strong>
                <span className={styles.night}>/ night</span>
              </div>
              <p className={styles.priceNote}>Rates vary by season. 7+ night discount with code <strong>DIRECT7</strong>.</p>

              <div className={styles.fields}>
                <label>
                  <span>Check-in</span>
                  <input type="date" name="checkin" />
                </label>
                <label>
                  <span>Check-out</span>
                  <input type="date" name="checkout" />
                </label>
                <label>
                  <span>Guests</span>
                  <select name="guests" defaultValue="2">
                    {[...Array(villa.sleeps)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1} guest{i ? 's' : ''}</option>
                    ))}
                  </select>
                </label>
              </div>

              <motion.a
                href={`mailto:info@aquamarine365.com?subject=Enquiry: ${encodeURIComponent(villa.name)}&body=Hi Aquamarine, I'd like to check availability at ${encodeURIComponent(villa.name)} for...`}
                className={`btn btn--primary btn--lg ${styles.cta}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enquire now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              <ul className={styles.perks}>
                <li><Check /> Reply within 1 hour, 8am–10pm CY</li>
                <li><Check /> 30% deposit · free cancel 30 days out</li>
                <li><Check /> No booking fees · no markup</li>
              </ul>
            </motion.div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
