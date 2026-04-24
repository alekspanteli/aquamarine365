'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageLoader } from '@/components/ui/skeleton';

export default function StayCarousel({ villas }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadedCovers, setLoadedCovers] = useState(() => new Set());
  const coverLoaded = loadedCovers.has(villas[index].slug);
  const markCoverLoaded = (slug) =>
    setLoadedCovers((s) => {
      if (s.has(slug)) return s;
      const next = new Set(s);
      next.add(slug);
      return next;
    });

  const go = useCallback(
    (i) => {
      const next = (i + villas.length) % villas.length;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, villas.length]
  );

  // Arrow keys scoped to the section (tabIndex=0) — no global hijack.
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };

  const villa = villas[index];

  return (
    <section
      className="py-20 md:py-32 bg-[var(--bg-2)] relative outline-none"
      id="stays"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Browse villas"
      onKeyDown={onKeyDown}
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="label label-accent mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--accent)]" />
              The homes
            </div>
            <h2 className="max-w-[18ch]">
              Three villas. All ours. <span className="text-[var(--accent)]">None resold.</span>
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
            <span className="font-mono text-sm min-w-[84px] text-center flex items-center gap-2 justify-center">
              <span className="text-[var(--fg)] font-semibold">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-[var(--fg-muted)]">/</span>
              <span className="text-[var(--fg-muted)]">{String(villas.length).padStart(2, '0')}</span>
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

        <div className="relative rounded-[28px] overflow-hidden h-[820px] sm:h-[700px] lg:h-[520px]">
          {/* Persistent skeleton under the transition so there's never a bare gap */}
          {!coverLoaded && <ImageLoader className="absolute inset-0 z-[1]" />}
          <AnimatePresence custom={direction}>
            <motion.div
              key={villa.slug}
              custom={direction}
              variants={{
                enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                center: { x: 0, opacity: 1, zIndex: 2 },
                exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, zIndex: 1 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(index + 1);
                else if (info.offset.x > 80) go(index - 1);
              }}
              className="absolute inset-0 grid lg:grid-cols-[1.25fr_1fr] bg-[var(--surface)] border border-[var(--line)] rounded-[28px] overflow-hidden cursor-grab active:cursor-grabbing"
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
                  onLoad={() => markCoverLoaded(villa.slug)}
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth > 0) markCoverLoaded(villa.slug);
                  }}
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${coverLoaded ? 'opacity-100' : 'opacity-0'}`}
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

              <div className="p-6 md:p-10 flex flex-col gap-4 md:gap-5">
                <div className="label">{villa.location}</div>
                <h3 className="font-display text-2xl md:text-4xl leading-tight">
                  {villa.name}
                </h3>
                <p className="text-[var(--fg-2)] leading-relaxed">{villa.tagline}</p>

                <ul className="grid grid-cols-2 gap-3 md:gap-4 py-4 md:py-5 my-1 md:my-2 border-y border-[var(--line)]">
                  {villa.specs.slice(0, 4).map((s) => (
                    <li key={s.label} className="flex flex-col gap-0.5">
                      <span className="label !text-[0.65rem]">{s.label}</span>
                      <strong className="font-display text-base md:text-lg font-medium">{s.value}</strong>
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

        <div role="tablist" aria-label="Browse villas" className="mt-5 grid md:grid-cols-3 gap-3">
          {villas.map((v, i) => (
            <button
              key={v.slug}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`group flex items-center gap-4 p-3 rounded-2xl border-2 transition text-left bg-[var(--surface)] ${
                i === index
                  ? 'border-[var(--accent)] shadow-[0_8px_24px_rgba(14,124,136,0.18)] -translate-y-0.5'
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
