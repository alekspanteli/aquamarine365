'use client';

import { useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useSiteSettings } from '@/components/SiteSettingsProvider';
import { useVillas } from '@/components/VillasProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageLoader } from '@/components/ui/skeleton';

export default function StayCarousel() {
  const settings = useSiteSettings();
  const villas = useVillas();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadedCovers, setLoadedCovers] = useState<Set<string>>(() => new Set());

  if (!villas.length) {
    return null;
  }

  const coverLoaded = loadedCovers.has(villas[index].slug);
  const villa = villas[index];

  const markCoverLoaded = (slug: string) =>
    setLoadedCovers((current) => {
      if (current.has(slug)) {
        return current;
      }

      const next = new Set(current);
      next.add(slug);
      return next;
    });

  const go = (nextIndex: number) => {
    const next = (nextIndex + villas.length) % villas.length;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section
      className="relative bg-[var(--bg-2)] py-20 outline-none md:py-32"
      id="stays"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Browse villas"
      onKeyDown={onKeyDown}
    >
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label label-accent mb-4 flex items-center gap-2">
              <span className="h-px w-6 bg-[var(--accent)]" />
              {settings.stays.eyebrow}
            </div>
            <h2 className="max-w-[18ch]">
              {settings.stays.title}{' '}
              <span className="text-[var(--accent)]">{settings.stays.highlight}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3" aria-label="Carousel controls">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous stay"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] shadow-md transition hover:bg-[var(--accent)] hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="flex min-w-[84px] items-center justify-center gap-2 text-center font-mono text-sm">
              <span className="font-semibold text-[var(--fg)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[var(--fg-muted)]">/</span>
              <span className="text-[var(--fg-muted)]">
                {String(villas.length).padStart(2, '0')}
              </span>
            </span>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next stay"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] shadow-md transition hover:bg-[var(--accent)] hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative h-[820px] overflow-hidden rounded-[28px] sm:h-[700px] lg:h-[520px]">
          {!coverLoaded ? <ImageLoader className="absolute inset-0 z-[1]" /> : null}
          <AnimatePresence custom={direction}>
            <motion.div
              key={villa.slug}
              custom={direction}
              variants={{
                enter: (value: number) => ({ x: value > 0 ? 80 : -80, opacity: 0 }),
                center: { x: 0, opacity: 1, zIndex: 2 },
                exit: (value: number) => ({ x: value > 0 ? -80 : 80, opacity: 0, zIndex: 1 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) {
                  go(index + 1);
                } else if (info.offset.x > 80) {
                  go(index - 1);
                }
              }}
              className="absolute inset-0 grid cursor-grab overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] active:cursor-grabbing lg:grid-cols-[1.25fr_1fr]"
            >
              <Link
                href={`/stays/${villa.slug}`}
                className="group relative block min-h-[300px] overflow-hidden lg:min-h-[520px]"
                aria-label={`View ${villa.name}`}
              >
                <Image
                  src={villa.cover}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={index === 0}
                  onLoad={() => markCoverLoaded(villa.slug)}
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                    coverLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <Badge
                  variant="live"
                  className="absolute top-5 left-5 border-transparent bg-white/95 !text-[var(--color-ink)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </Badge>
                <div className="absolute top-5 right-5 flex items-baseline gap-1 rounded-2xl bg-[var(--color-ink)] px-4 py-2.5 text-white shadow-xl">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-white/70">
                    From
                  </span>
                  <strong className="ml-1 font-display text-xl font-medium">
                    EUR {villa.priceFrom}
                  </strong>
                  <span className="text-[0.7rem] text-white/70">/night</span>
                </div>
              </Link>

              <div className="flex flex-col gap-4 p-6 md:gap-5 md:p-10">
                <div className="label">{villa.location}</div>
                <h3 className="font-display text-2xl leading-tight md:text-4xl">{villa.name}</h3>
                <p className="leading-relaxed text-[var(--fg-2)]">{villa.tagline}</p>

                <ul className="my-1 grid grid-cols-2 gap-3 border-y border-[var(--line)] py-4 md:my-2 md:gap-4 md:py-5">
                  {villa.specs.slice(0, 4).map((spec) => (
                    <li key={spec.label} className="flex flex-col gap-0.5">
                      <span className="label !text-[0.65rem]">{spec.label}</span>
                      <strong className="font-display text-base font-medium md:text-lg">
                        {spec.value}
                      </strong>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="label !text-[0.68rem]">from</span>
                    <strong className="font-display text-2xl font-medium">
                      EUR {villa.priceFrom}
                    </strong>
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

        <div role="tablist" aria-label="Browse villas" className="mt-5 grid gap-3 md:grid-cols-3">
          {villas.map((villaItem, villaIndex) => (
            <button
              key={villaItem.slug}
              onClick={() => {
                setDirection(villaIndex > index ? 1 : -1);
                setIndex(villaIndex);
              }}
              className={`group flex items-center gap-4 rounded-2xl border-2 bg-[var(--surface)] p-3 text-left transition ${
                villaIndex === index
                  ? 'border-[var(--accent)] shadow-[0_8px_24px_rgba(14,124,136,0.18)] -translate-y-0.5'
                  : 'border-[var(--line)] hover:border-[var(--fg-2)] hover:-translate-y-0.5'
              }`}
              aria-selected={villaIndex === index}
              role="tab"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={villaItem.cover} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <strong className="truncate text-sm font-medium">{villaItem.name}</strong>
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  Sleeps {villaItem.sleeps} - EUR {villaItem.priceFrom}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
