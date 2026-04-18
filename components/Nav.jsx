'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Aquamarine home">
          <span className={styles.mark} aria-hidden />
          <span className={styles.word}>Aquamarine</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          <Link href="/#stays">Stays</Link>
          <Link href="/#why">Why us</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#guests">Guests</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/#book" className={`btn btn--primary ${styles.cta}`}>
          Check availability
        </Link>

        <button
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? styles.bar1open : ''} />
          <span className={open ? styles.bar2open : ''} />
          <span className={open ? styles.bar3open : ''} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            className={styles.mobile}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile"
          >
            {['stays', 'why', 'how', 'guests', 'contact'].map((id) => (
              <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
                {id === 'how' ? 'How it works' : id === 'why' ? 'Why us' : id[0].toUpperCase() + id.slice(1)}
              </Link>
            ))}
            <Link href="/#book" className="btn btn--primary" onClick={() => setOpen(false)}>
              Check availability
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
