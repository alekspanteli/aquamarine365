'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Counter from './Counter';

const proof = [
  { render: () => <Counter to={4.9} decimals={1} />, v: 'Guest rating · 300+ stays' },
  { render: () => <Counter to={12} suffix=" yrs" />, v: 'Local in Ayia Napa' },
  { render: () => <Counter to={0} suffix="%" />, v: 'Booking fees, direct' },
  { render: () => '24/7', v: 'On-island support' }
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden min-h-[92svh] flex flex-col justify-end"
    >
      {/* Background image — only animates on desktop to avoid mobile scroll lag */}
      <motion.div
        style={allowParallax ? { y, scale, opacity } : undefined}
        className="absolute inset-[-2%] -z-10"
        aria-hidden
      >
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=65"
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

      {/* Readability scrim — stronger gradient so H1 always reads */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,22,28,0.55) 0%, rgba(11,22,28,0.35) 30%, rgba(11,22,28,0.92) 100%), radial-gradient(1200px 500px at 110% -10%, rgba(208,107,67,0.28), transparent 60%)'
        }}
        aria-hidden
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <div className="hidden md:block absolute top-24 right-8 lg:right-12 z-10 text-white/70 text-right">
        <div className="label !text-white/60">34° 59′ N · 34° 00′ E</div>
        <div className="font-mono text-xs mt-1 tracking-wider">AYIA NAPA / CYPRUS</div>
      </div>

      <div className="container-x relative z-10 pb-16 md:pb-24 pt-28 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label mb-4 text-[color:var(--color-aqua-soft)] !text-white/75"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-white/60" />
            Edition 12 · Summer 2026
          </span>
        </motion.div>

        <motion.h1
          className="max-w-[14ch] leading-[0.92] tracking-[-0.035em] !text-white"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Villas in Ayia Napa,
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block italic font-light"
            style={{ color: 'var(--color-coral-dark)' }}
          >
            run like a hotel.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 md:mt-8 max-w-[52ch] text-base md:text-lg text-white/90 leading-relaxed"
        >
          Private seafront homes, cleaned before every arrival, stocked on request, and backed by a real human on call 24/7.{' '}
          <span className="text-white">Book direct — no platform fees.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild variant="punch" size="lg">
            <Link href="#book">
              Check availability
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 hover:text-white"
          >
            <Link href="#stays">See the homes</Link>
          </Button>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          className="mt-14 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
          aria-label="At a glance"
        >
          {proof.map((p, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-1"
            >
              <strong className="font-display text-2xl md:text-3xl font-light !text-white">
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
