'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function StayCarousel({ villas }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (i) => {
      const next = (i + villas.length) % villas.length;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, villas.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  const villa = villas[index];

  return (
    <section className="py-20 md:py-32 bg-[var(--bg-2)] relative" id="stays">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="label label-accent mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--accent)]" />
              The homes · 02
            </div>
            <h2 className="max-w-[18ch]">
              Three villas. All ours. <em className="italic">None resold.</em>
            </h2>
          </div>
          <div className="flex items-center gap-3" aria-label="Carousel controls">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous stay"
              className="h-12 w-12 rounded-full bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white shadow-md transition inline-flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="font-mono text-sm min-w-[76px] text-center">
              <span className="text-[var(--fg)]">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-[var(--fg-muted)]"> / {String(villas.length).padStart(2, '0')}</span>
            </span>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next stay"
              className="h-12 w-12 rounded-full bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white shadow-md transition inline-flex items-center justify-center"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative rounded-[28px] overflow-hidden min-h-[520px] md:min-h-[520px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={villa.slug}
              custom={direction}
              variants={{
                enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(index + 1);
                else if (info.offset.x > 80) go(index - 1);
              }}
              className="grid lg:grid-cols-[1.25fr_1fr] bg-[var(--surface)] border border-[var(--line)] rounded-[28px] overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <Link
                href={`/stays/${villa.slug}`}
                className="relative block min-h-[300px] lg:min-h-[520px] overflow-hidden group"
                aria-label={`View ${villa.name}`}
              >
                <Image
                  src={villa.cover}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKpgA//Z"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                <Badge
                  variant="live"
                  className="absolute top-5 left-5 bg-white/95 !text-[var(--color-ink)] border-transparent"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available
                </Badge>
                <div className="absolute top-5 right-5 flex items-baseline gap-1 bg-[var(--color-ink)] text-white px-4 py-2.5 rounded-2xl shadow-xl">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-white/70">From</span>
                  <strong className="font-display text-xl font-medium ml-1">€{villa.priceFrom}</strong>
                  <span className="text-[0.7rem] text-white/70">/night</span>
                </div>
              </Link>

              <div className="p-8 md:p-10 flex flex-col gap-5">
                <div className="label">{villa.location}</div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight">
                  {villa.name}
                </h3>
                <p className="text-[var(--fg-2)] leading-relaxed">{villa.tagline}</p>

                <ul className="grid grid-cols-2 gap-4 py-5 my-2 border-y border-[var(--line)]">
                  {villa.specs.slice(0, 4).map((s) => (
                    <li key={s.label} className="flex flex-col gap-0.5">
                      <span className="label !text-[0.68rem]">{s.label}</span>
                      <strong className="font-display text-lg font-medium">{s.value}</strong>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="label !text-[0.68rem]">from</span>
                    <strong className="font-display text-2xl font-medium">€{villa.priceFrom}</strong>
                    <span className="text-sm text-[var(--fg-muted)]">/ night</span>
                  </div>
                  <Button asChild variant="default">
                    <Link href={`/stays/${villa.slug}`}>
                      Explore
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-3">
          {villas.map((v, i) => (
            <button
              key={v.slug}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`group flex items-center gap-4 p-3 rounded-2xl border transition text-left bg-[var(--surface)] ${
                i === index
                  ? 'border-[var(--fg)] shadow-md'
                  : 'border-[var(--line)] hover:border-[var(--fg-2)] hover:-translate-y-0.5'
              }`}
              aria-selected={i === index}
              role="tab"
            >
              <span className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={v.cover} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="flex flex-col gap-0.5 min-w-0">
                <strong className="text-sm font-medium truncate">{v.name}</strong>
                <span className="text-xs text-[var(--fg-muted)] font-mono">
                  Sleeps {v.sleeps} · €{v.priceFrom}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
