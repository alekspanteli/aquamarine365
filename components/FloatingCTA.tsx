'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

interface FloatingCTAProps {
  href?: string;
  label?: string;
}

export default function FloatingCTA({ href = '/#book', label = 'Check availability' }: FloatingCTAProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > 600 && y < h - 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex justify-center"
        >
          <Button asChild variant="punch" size="lg" className="w-full shadow-[0_16px_40px_rgba(15,29,33,0.35)]">
            <Link href={href}>
              {label}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
