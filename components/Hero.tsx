'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkle } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { useSiteSettings } from '@/components/SiteSettingsProvider';
import { imageUrl } from '@/sanity/image';
import FindMyVilla from './FindMyVilla';

export default function Hero() {
  const settings = useSiteSettings();
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [allowParallax, setAllowParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setAllowParallax(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
    layoutEffect: false
  });
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
          src={imageUrl(settings.hero.image, 2400) ?? settings.hero.image.url}
          alt={settings.hero.image.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder={settings.hero.image.lqip ? 'blur' : 'empty'}
          blurDataURL={settings.hero.image.lqip ?? undefined}
          className="object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,24,30,0.62) 0%, rgba(5,24,30,0.50) 42%, rgba(5,24,30,0.94) 100%),' +
            'radial-gradient(900px 700px at 15% 65%, rgba(5,24,30,0.55), transparent 70%)'
        }}
        aria-hidden
      />

      <div className="container-x relative z-10 pb-16 md:pb-24 pt-28 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label !text-white/80 mb-6"
        >
          {settings.hero.eyebrow}
        </motion.div>

        <motion.h1
          className="max-w-[18ch] leading-[1] tracking-[-0.028em] !text-white"
          style={{ textShadow: '0 2px 28px rgba(0,0,0,0.35)' }}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {settings.hero.headingLine1}
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{ color: 'var(--color-aqua)' }}
          >
            {settings.hero.headingLine2}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 md:mt-8 max-w-[56ch] text-base md:text-lg text-white/95 leading-relaxed font-sans"
          style={{ textShadow: '0 1px 20px rgba(0,0,0,0.35)' }}
        >
          {settings.hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild variant="sea" size="lg">
            <Link href="#book">
              {settings.hero.primaryCtaLabel}
              <ArrowRight size={16} weight="regular" />
            </Link>
          </Button>
          <FindMyVilla>
            <Button
              size="lg"
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 underline underline-offset-[6px] decoration-white/30 hover:decoration-white/60"
            >
              <Sparkle size={16} weight="regular" />
              {settings.hero.secondaryCtaLabel}
            </Button>
          </FindMyVilla>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
          className="mt-14 pt-7 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
          aria-label="At a glance"
        >
          {settings.hero.stats.map((stat, i) => (
            <motion.li
              key={`${stat.value}-${i}`}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-1"
            >
              <strong className="font-display text-2xl md:text-3xl font-medium !text-white">
                {stat.value}
              </strong>
              <span className="text-xs md:text-sm text-white/70">{stat.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
