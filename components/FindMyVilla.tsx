'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkle, Check } from '@phosphor-icons/react/dist/ssr';
import type { QuizAnswers, QuizQuestionId } from '@/types/domain';
import { useVillas } from '@/components/VillasProvider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { QUIZ, recommendVilla } from '@/lib/villaMatcher';

interface FindMyVillaProps {
  children?: ReactNode;
  className?: string;
}

export default function FindMyVilla({ children, className }: FindMyVillaProps) {
  const villas = useVillas();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [advancing, setAdvancing] = useState(false);
  const closeResetTimeoutRef = useRef<number | null>(null);
  const stepAdvanceTimeoutRef = useRef<number | null>(null);
  const done = step >= QUIZ.length;
  const currentQuestion = done ? null : QUIZ[step];
  const recommendation = done ? recommendVilla(villas, answers) : null;

  const clearTimers = () => {
    if (closeResetTimeoutRef.current !== null) {
      window.clearTimeout(closeResetTimeoutRef.current);
      closeResetTimeoutRef.current = null;
    }

    if (stepAdvanceTimeoutRef.current !== null) {
      window.clearTimeout(stepAdvanceTimeoutRef.current);
      stepAdvanceTimeoutRef.current = null;
    }
  };

  const reset = () => {
    clearTimers();
    setStep(0);
    setAnswers({});
    setAdvancing(false);
  };

  useEffect(() => clearTimers, []);

  const choose = (questionId: QuizQuestionId, optionId: string) => {
    if (advancing) {
      return;
    }

    setAdvancing(true);
    setAnswers((currentAnswers) => ({ ...currentAnswers, [questionId]: optionId }));

    stepAdvanceTimeoutRef.current = window.setTimeout(() => {
      setStep((currentStep) => currentStep + 1);
      setAdvancing(false);
      stepAdvanceTimeoutRef.current = null;
    }, 180);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          clearTimers();
          closeResetTimeoutRef.current = window.setTimeout(() => {
            reset();
            closeResetTimeoutRef.current = null;
          }, 300);
        }
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

        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 pt-5 pb-3">
          <div>
            <div className="label label-accent">Find your villa</div>
            <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
              {done ? 'Your match' : `Question ${step + 1} of ${QUIZ.length}`}
            </p>
          </div>
          {!done ? (
            <div className="flex gap-1.5" aria-label="Progress">
              {QUIZ.map((question, questionIndex) => (
                <span
                  key={question.id}
                  className={`h-1.5 w-5 rounded-full transition-colors ${
                    questionIndex <= step ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="min-h-[340px] px-6 py-6">
          <AnimatePresence mode="wait">
            {currentQuestion ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="mb-5 font-display text-2xl leading-tight tracking-tight md:text-[1.7rem]">
                  {currentQuestion.prompt}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {currentQuestion.options.map((option) => {
                    const selected = answers[currentQuestion.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => choose(currentQuestion.id, option.id)}
                        disabled={advancing}
                        className={`group flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition disabled:cursor-not-allowed disabled:opacity-80 ${
                          selected
                            ? 'border-[var(--accent)] bg-[color:var(--accent)]/5'
                            : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--fg-2)]'
                        }`}
                      >
                        <span>
                          <span className="block font-medium text-[var(--fg)]">{option.label}</span>
                          {option.sub ? (
                            <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                              {option.sub}
                            </span>
                          ) : null}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-[var(--fg-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                          aria-hidden
                        />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : recommendation ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="label label-accent mb-3 flex items-center gap-2">
                  <Sparkle size={14} weight="regular" />
                  Your match
                </div>
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={recommendation.winner.cover}
                    alt={recommendation.winner.name}
                    fill
                    sizes="(max-width: 560px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute right-3 bottom-3 rounded-xl bg-[var(--color-ink)] px-3 py-1.5 font-mono text-xs text-white">
                    from EUR {recommendation.winner.priceFrom}/night
                  </div>
                </div>
                <h3 className="font-display text-2xl leading-tight tracking-tight">
                  {recommendation.winner.name}
                </h3>
                <p className="mt-2 leading-relaxed text-[var(--fg-2)]">
                  {recommendation.winner.tagline}
                </p>
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/8 p-3">
                  <Check
                    size={16}
                    weight="regular"
                    className="mt-0.5 shrink-0 text-[var(--accent)]"
                  />
                  <span className="text-sm text-[var(--fg)]">
                    Why this one:{' '}
                    <span className="text-[var(--fg-muted)]">{recommendation.reason}</span>
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button asChild variant="sea">
                    <Link
                      href={`/stays/${recommendation.winner.slug}`}
                      onClick={() => setOpen(false)}
                    >
                      View {recommendation.winner.name}
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    Try again
                  </Button>
                  <span className="mt-1 w-full text-xs text-[var(--fg-muted)]">
                    Close second:{' '}
                    <Link
                      href={`/stays/${recommendation.runnerUp.slug}`}
                      className="text-[var(--accent)] underline-offset-4 hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {recommendation.runnerUp.name}
                    </Link>
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
