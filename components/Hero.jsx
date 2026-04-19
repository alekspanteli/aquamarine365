'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import Counter from './Counter';

const proof = [
  { render: () => <Counter to={4.9} decimals={1} />, v: 'Guest rating · 300+ stays' },
  { render: () => <Counter to={12} suffix=" yrs" />, v: 'Operating in Ayia Napa' },
  { render: () => <Counter to={0} suffix="%" />, v: 'Platform fees when direct' },
  { render: () => '24/7', v: 'On-island guest support' }
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [allowParallax, setAllowParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setAllowParallax(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden min-h-[88svh] flex flex-col justify-end"
    >
      <motion.div
        style={allowParallax ? { y, scale, opacity } : undefined}
        className="absolute inset-[-2%] -z-10"
        aria-hidden
      >
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=55"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKpgA//Z"
          className="object-cover"
        />
      </motion.div>

      {/* Quieter, more corporate scrim — restrained, not flashy */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,33,43,0.42) 0%, rgba(5,33,43,0.20) 35%, rgba(5,33,43,0.90) 100%)'
        }}
        aria-hidden
      />

      <div className="container-x relative z-10 pb-16 md:pb-24 pt-28 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label !text-white/70 mb-6"
        >
          Ayia Napa · Cyprus
        </motion.div>

        <motion.h1
          className="max-w-[18ch] leading-[1] tracking-[-0.028em] !text-white"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Private villas in Ayia Napa,
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{ color: 'var(--color-aqua)' }}
          >
            managed like a hotel.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 md:mt-8 max-w-[56ch] text-base md:text-lg text-white/85 leading-relaxed font-sans"
        >
          A small, owner-operated collection of seafront homes. Cleaned before every arrival, stocked on request, backed by a real team on the island 24/7. Book direct — no platform fees.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild variant="sea" size="lg">
            <Link href="#book">
              Check availability
              <ArrowRight size={16} weight="regular" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 hover:text-white"
          >
            <Link href="#stays">View the villas</Link>
          </Button>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
          className="mt-14 pt-7 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
          aria-label="At a glance"
        >
          {proof.map((p, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-1"
            >
              <strong className="font-display text-2xl md:text-3xl font-medium !text-white">
                {p.render()}
              </strong>
              <span className="text-xs md:text-sm text-white/70">{p.v}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
