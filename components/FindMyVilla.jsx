'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkle, Check } from '@phosphor-icons/react/dist/ssr';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QUIZ, recommendVilla } from '@/lib/villaMatcher';

export default function FindMyVilla({ children, className }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= QUIZ.length;

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const choose = (qId, optId) => {
    setAnswers((a) => ({ ...a, [qId]: optId }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const recommendation = done ? recommendVilla(answers) : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 300);
      }}
    >
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" className={className}>
            <Sparkle size={16} weight="regular" />
            Find your villa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[560px] p-0">
        <DialogTitle>Find your villa</DialogTitle>
        <DialogDescription>
          Answer four quick questions and we&apos;ll recommend the best villa for your trip.
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[var(--line)]">
          <div>
            <div className="label label-accent">Find your villa</div>
            <p className="text-sm text-[var(--fg-muted)] mt-0.5">
              {done ? 'Your match' : `Question ${step + 1} of ${QUIZ.length}`}
            </p>
          </div>
          {!done && (
            <div className="flex gap-1.5" aria-label="Progress">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-5 rounded-full transition-colors ${
                    i <= step ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6 min-h-[340px]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight tracking-tight mb-5">
                  {QUIZ[step].prompt}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {QUIZ[step].options.map((opt) => {
                    const selected = answers[QUIZ[step].id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => choose(QUIZ[step].id, opt.id)}
                        className={`group flex items-center justify-between gap-4 text-left rounded-xl border px-4 py-3.5 transition ${
                          selected
                            ? 'border-[var(--accent)] bg-[color:var(--accent)]/5'
                            : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--fg-2)]'
                        }`}
                      >
                        <span>
                          <span className="block font-medium text-[var(--fg)]">{opt.label}</span>
                          {opt.sub && (
                            <span className="block text-xs text-[var(--fg-muted)] mt-0.5">
                              {opt.sub}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-[var(--fg-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition"
                          aria-hidden
                        />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="label label-accent flex items-center gap-2 mb-3">
                  <Sparkle size={14} weight="regular" />
                  Your match
                </div>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={recommendation.winner.cover}
                    alt={recommendation.winner.name}
                    fill
                    sizes="(max-width: 560px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-[var(--color-ink)] text-white px-3 py-1.5 rounded-xl font-mono text-xs">
                    from €{recommendation.winner.priceFrom}/night
                  </div>
                </div>
                <h3 className="font-display text-2xl leading-tight tracking-tight">
                  {recommendation.winner.name}
                </h3>
                <p className="mt-2 text-[var(--fg-2)] leading-relaxed">
                  {recommendation.winner.tagline}
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[color:var(--accent)]/8 border border-[color:var(--accent)]/20 flex items-start gap-2.5">
                  <Check size={16} weight="regular" className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--fg)]">
                    Why this one: <span className="text-[var(--fg-muted)]">{recommendation.reason}</span>
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button asChild variant="sea">
                    <Link href={`/stays/${recommendation.winner.slug}`} onClick={() => setOpen(false)}>
                      View {recommendation.winner.name}
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    Try again
                  </Button>
                  <span className="w-full text-xs text-[var(--fg-muted)] mt-1">
                    Close second: <Link href={`/stays/${recommendation.runnerUp.slug}`} className="text-[var(--accent)] hover:underline underline-offset-4" onClick={() => setOpen(false)}>{recommendation.runnerUp.name}</Link>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
