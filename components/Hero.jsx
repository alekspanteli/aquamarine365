'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden min-h-[92svh] flex flex-col justify-end"
    >
      {/* Layered background */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-[-5%] -z-10">
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
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,29,33,0.35) 0%, rgba(15,29,33,0.15) 35%, rgba(15,29,33,0.9) 100%), radial-gradient(1200px 500px at 110% -10%, rgba(216,107,60,0.25), transparent 60%)'
        }}
        aria-hidden
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      {/* Frame marks (editorial detail) */}
      <div className="hidden md:block absolute top-24 right-8 lg:right-12 z-10 text-white/70 text-right">
        <div className="label !text-white/60">34° 59′ N · 34° 00′ E</div>
        <div className="font-mono text-xs mt-1 tracking-wider">AYIA NAPA / CYPRUS</div>
      </div>

      <div className="container-x relative z-10 pb-14 md:pb-24 pt-28 md:pt-40 text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label !text-[color:var(--accent-soft)] mb-4"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-[color:var(--accent-soft)]" />
            Edition 12 · Summer 2026
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-white max-w-[14ch] leading-[0.92] tracking-[-0.035em]"
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
            className="block italic font-light text-[color:var(--punch)]"
          >
            run like a hotel.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 md:mt-8 max-w-[52ch] text-base md:text-lg text-white/85 leading-relaxed"
        >
          Private seafront homes, cleaned before every arrival, stocked on request, and backed by a real human on call 24/7.
          <span className="text-white"> Book direct — no platform fees.</span>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20"
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
              <strong className="font-display text-2xl md:text-3xl font-light text-white">
                {p.render()}
              </strong>
              <span className="text-xs md:text-sm text-white/65">{p.v}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute left-1/2 bottom-6 -translate-x-1/2 flex-col items-center gap-2 text-white/70 text-[10px] tracking-[0.25em] uppercase"
        aria-hidden
      >
        Scroll
        <div className="w-px h-10 bg-white/30 relative overflow-hidden">
          <motion.span
            animate={{ y: [-10, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 left-0 w-px h-3 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
