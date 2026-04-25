'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left center',
        background: 'linear-gradient(90deg, var(--accent) 0%, var(--punch) 100%)'
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      aria-hidden
    />
  );
}
