'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VillaGallery.module.css';

export default function VillaGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback(
    (i) => {
      const next = (i + images.length) % images.length;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, images.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.stage}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              className={styles.slide}
              variants={{
                enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(index + 1);
                else if (info.offset.x > 80) go(index - 1);
              }}
              onClick={() => setLightbox(true)}
            >
              <Image
                src={images[index]}
                alt={`${name} — image ${index + 1}`}
                fill
                sizes="(max-width: 960px) 100vw, 70vw"
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          <button
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={() => go(index - 1)}
            aria-label="Previous image"
          >
            <Arrow dir="left" />
          </button>
          <button
            className={`${styles.nav} ${styles.navNext}`}
            onClick={() => go(index + 1)}
            aria-label="Next image"
          >
            <Arrow dir="right" />
          </button>

          <div className={styles.counter}>
            {String(index + 1).padStart(2, '0')} <span>/</span> {String(images.length).padStart(2, '0')}
          </div>

          <button className={styles.expand} onClick={() => setLightbox(true)} aria-label="Open full size">
            <Expand />
          </button>
        </div>

        <div className={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={src}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Show image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              className={styles.close}
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              aria-label="Close"
            >
              <Close />
            </button>
            <motion.div
              className={styles.lightboxStage}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${name} — image ${index + 1}`}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
              />
              <button
                className={`${styles.lbNav} ${styles.lbPrev}`}
                onClick={() => go(index - 1)}
                aria-label="Previous image"
              >
                <Arrow dir="left" />
              </button>
              <button
                className={`${styles.lbNav} ${styles.lbNext}`}
                onClick={() => go(index + 1)}
                aria-label="Next image"
              >
                <Arrow dir="right" />
              </button>
              <div className={styles.lbCounter}>
                {index + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Arrow({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
function Expand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function Close() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
