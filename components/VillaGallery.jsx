'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';

export default function VillaGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback(
    (i) => {
      const next = (i + images.length) % images.length;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, images.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--color-ink)] cursor-grab active:cursor-grabbing shadow-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(index + 1);
                else if (info.offset.x > 80) go(index - 1);
              }}
              onClick={() => setLightbox(true)}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt={`${name} — image ${index + 1}`}
                fill
                sizes="(max-width: 960px) 100vw, 70vw"
                className="object-cover"
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKpgA//Z"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => go(index - 1)}
            aria-label="Previous image"
            className="absolute top-1/2 -translate-y-1/2 left-4 h-12 w-12 rounded-full bg-white/90 backdrop-blur text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition z-10 inline-flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next image"
            className="absolute top-1/2 -translate-y-1/2 right-4 h-12 w-12 rounded-full bg-white/90 backdrop-blur text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition z-10 inline-flex items-center justify-center"
          >
            <ArrowRight size={18} />
          </button>

          <div className="absolute bottom-4 left-4 bg-black/65 backdrop-blur text-white font-mono text-sm px-4 py-2 rounded-full z-10">
            {String(index + 1).padStart(2, '0')} <span className="text-white/50">/</span> {String(images.length).padStart(2, '0')}
          </div>

          <button
            onClick={() => setLightbox(true)}
            aria-label="Open full size"
            className="absolute bottom-4 right-4 h-10 w-10 rounded-xl bg-white/90 backdrop-blur text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition z-10 inline-flex items-center justify-center"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-2.5">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Show image ${i + 1}`}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition hover:-translate-y-0.5 ${
                i === index ? 'border-[var(--accent)]' : 'border-transparent'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className={`object-cover transition-opacity ${i === index ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] bg-[var(--color-ink-dark)]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              aria-label="Close"
              className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 inline-flex items-center justify-center z-10"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(1400px,92vw)] h-[min(90vh,900px)]"
            >
              <Image
                src={images[index]}
                alt={`${name} — image ${index + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous image"
                className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-6 h-13 w-13 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/25 backdrop-blur inline-flex items-center justify-center"
                style={{ height: 52, width: 52 }}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next image"
                className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-6 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/25 backdrop-blur inline-flex items-center justify-center"
                style={{ height: 52, width: 52 }}
              >
                <ArrowRight size={20} />
              </button>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono tracking-widest">
                {index + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
