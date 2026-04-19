'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

const KEY = 'aq-cookie-consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 800);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const decide = (value) => {
    try { localStorage.setItem(KEY, value); } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="fixed left-4 right-[5.5rem] md:left-6 md:right-auto bottom-4 md:bottom-6 z-[60] max-w-md"
          role="dialog"
          aria-label="Cookie notice"
        >
          <div className="relative bg-[var(--surface)] border border-[var(--line)] shadow-[0_20px_60px_rgba(14,29,34,0.25)] rounded-2xl p-5 md:p-6">
            <button
              onClick={() => decide('dismissed')}
              aria-label="Dismiss"
              className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full text-[var(--fg-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)] transition"
            >
              <X size={14} weight="light" />
            </button>
            <div className="label label-accent mb-2 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--accent)]" />
              Crumbs &amp; cookies
            </div>
            <p className="text-[0.95rem] text-[var(--fg-2)] leading-relaxed pr-4">
              We use a few cookies so the site remembers your theme and whether you&apos;ve
              seen this notice. Nothing cross-site, nothing sold.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => decide('accepted')}>Accept</Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => decide('essential')}
              >
                Essential only
              </Button>
              <a
                href="/legal/cookies"
                className="inline-flex items-center px-3 h-9 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
              >
                Details
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
