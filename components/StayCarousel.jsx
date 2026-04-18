'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import styles from './StayCarousel.module.css';

export default function StayCarousel({ villas }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  const go = (i) => {
    const next = (i + villas.length) % villas.length;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  const villa = villas[index];

  return (
    <section className="section" id="stays">
      <div className="container">
        <div className={styles.head}>
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The homes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Three villas. All ours. None resold.
            </motion.h2>
          </div>
          <div className={styles.controls} aria-label="Carousel controls">
            <button className={styles.arrow} onClick={() => go(index - 1)} aria-label="Previous stay">
              <Arrow dir="left" />
            </button>
            <span className={styles.counter}>
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <span> / {String(villas.length).padStart(2, '0')}</span>
            </span>
            <button className={styles.arrow} onClick={() => go(index + 1)} aria-label="Next stay">
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        <div className={styles.stage} ref={trackRef}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={villa.slug}
              className={styles.card}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              style={{ x }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(index + 1);
                else if (info.offset.x > 80) go(index - 1);
              }}
            >
              <Link href={`/stays/${villa.slug}`} className={styles.media} aria-label={`View ${villa.name}`}>
                <Image
                  src={villa.cover}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 960px) 100vw, 60vw"
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
                <div className={styles.mediaOverlay}>
                  <span>View villa</span>
                  <Arrow dir="right" />
                </div>
              </Link>

              <div className={styles.body}>
                <p className={styles.loc}>{villa.location}</p>
                <h3 className={styles.name}>{villa.name}</h3>
                <p className={styles.tag}>{villa.tagline}</p>

                <ul className={styles.specs}>
                  {villa.specs.slice(0, 4).map((s) => (
                    <li key={s.label}>
                      <span>{s.label}</span>
                      <strong>{s.value}</strong>
                    </li>
                  ))}
                </ul>

                <div className={styles.footer}>
                  <div>
                    <span className={styles.from}>From</span>
                    <strong className={styles.price}>€{villa.priceFrom}</strong>
                    <span className={styles.night}>/ night</span>
                  </div>
                  <Link href={`/stays/${villa.slug}`} className="btn btn--primary">
                    Explore
                    <Arrow dir="right" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.thumbs} role="tablist">
          {villas.map((v, i) => (
            <button
              key={v.slug}
              role="tab"
              aria-selected={i === index}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
            >
              <span className={styles.thumbImg}>
                <Image src={v.cover} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
              </span>
              <span className={styles.thumbMeta}>
                <strong>{v.name}</strong>
                <span>Sleeps {v.sleeps} · from €{v.priceFrom}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 })
};

function Arrow({ dir = 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'right' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
