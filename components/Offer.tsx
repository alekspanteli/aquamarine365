'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, CalendarBlank, Minus, Plus } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'sonner';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/skeleton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useSiteSettings } from '@/components/SiteSettingsProvider';

const fmtDay = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

function formatDatesValue(range: DateRange | undefined, guests: number): string {
  const parts: string[] = [];
  if (range?.from && range?.to) parts.push(`${fmtDay(range.from)} - ${fmtDay(range.to)}`);
  else if (range?.from) parts.push(fmtDay(range.from));
  if (guests > 0) parts.push(`${guests} ${guests === 1 ? 'guest' : 'guests'}`);
  return parts.join(' - ');
}

type Status = 'idle' | 'loading' | 'sent';
type FormErrors = Partial<Record<'name' | 'email' | 'dates', string>>;

export default function Offer() {
  const settings = useSiteSettings();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [pickerOpen, setPickerOpen] = useState(false);
  const datesValue = formatDatesValue(range, guests);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;
    setErrors({});
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      dates: form.get('dates'),
      code: settings.offer.code,
      website: form.get('website')
    };

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        throw new Error(data?.error || 'Could not send your enquiry.');
      }

      setStatus('sent');
      toast.success('Enquiry received', {
        description: settings.offer.replyNote
      });
      e.currentTarget.reset();
      setRange(undefined);
      setGuests(2);
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('idle');
      const message = err instanceof Error ? err.message : `Please try again, or email ${settings.contact.email}.`;
      toast.error('Something went wrong', {
        description: message
      });
    }
  };

  const loading = status === 'loading';
  const sent = status === 'sent';

  return (
    <section
      id="book"
      className="relative py-20 md:py-32 overflow-hidden isolate"
      style={{ background: 'linear-gradient(135deg, var(--color-ink-dark) 0%, #0E3A44 100%)' }}
    >
      <div
        aria-hidden
        className="absolute -z-10 opacity-50"
        style={{
          inset: 0,
          background:
            'radial-gradient(600px 400px at 15% 20%, color-mix(in srgb, var(--color-aqua) 18%, transparent), transparent 70%)'
        }}
      />

      <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="label mb-4 flex items-center gap-2" style={{ color: 'var(--color-terracotta-dark)' }}>
            <span className="w-6 h-px" style={{ background: 'var(--color-terracotta-dark)' }} />
            {settings.offer.eyebrow}
          </div>
          <h2 className="max-w-[18ch] !text-[var(--color-cream)]">
            <span className="block">{settings.offer.titleLine1}</span>
            <span className="block" style={{ color: 'var(--color-aqua)' }}>
              {settings.offer.titleLine2}
            </span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-cream)]/80 max-w-[52ch] leading-relaxed">
            {settings.offer.bodyPrefix}{' '}
            <strong
              className="font-mono px-2.5 py-1 rounded tracking-wider"
              style={{
                color: 'var(--color-terracotta-dark)',
                background: 'color-mix(in srgb, var(--color-terracotta-dark) 15%, transparent)'
              }}
            >
              {settings.offer.code}
            </strong>{' '}
            {settings.offer.bodySuffix}
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {settings.offer.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-[var(--color-cream)]/90">
                <Check size={18} className="shrink-0" style={{ color: 'var(--color-terracotta-dark)' }} />
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={submit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-[var(--color-cream)] p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4"
          style={{ color: 'var(--color-ink)' }}
        >
          <div aria-hidden className="hidden" tabIndex={-1}>
            <label htmlFor="offer-website">Leave this empty</label>
            <input id="offer-website" name="website" type="text" autoComplete="off" tabIndex={-1} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offer-name">Your name</Label>
            <Input
              id="offer-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'offer-name-error' : undefined}
              disabled={loading || sent}
            />
            {errors.name && (
              <p id="offer-name-error" role="alert" className="text-xs text-red-700 mt-1">
                {errors.name}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offer-email">Email</Label>
            <Input
              id="offer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'offer-email-error' : undefined}
              disabled={loading || sent}
            />
            {errors.email && (
              <p id="offer-email-error" role="alert" className="text-xs text-red-700 mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offer-dates">Dates &amp; guests</Label>
            <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
              <PopoverTrigger asChild>
                <button
                  id="offer-dates"
                  type="button"
                  disabled={loading || sent}
                  className="flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-left text-base text-[var(--fg)] transition-colors focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className={datesValue ? '' : 'text-[var(--fg-muted)]'}>
                    {datesValue || 'e.g. 12-19 July - 4 guests'}
                  </span>
                  <CalendarBlank size={16} className="shrink-0 text-[var(--fg-muted)]" aria-hidden />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  disabled={{ before: new Date() }}
                />
                <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-[var(--fg)]">Guests</div>
                    <div className="text-xs text-[var(--fg-muted)]">Ages 2+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      aria-label="Decrease guests"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] transition hover:bg-[var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center font-mono text-sm tabular-nums">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(16, g + 1))}
                      disabled={guests >= 16}
                      aria-label="Increase guests"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] transition hover:bg-[var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-end border-t border-[var(--line)] px-4 py-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="sea"
                    onClick={() => setPickerOpen(false)}
                    disabled={!range?.from}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <input type="hidden" name="dates" value={datesValue} />
            {errors.dates && (
              <p id="offer-dates-error" role="alert" className="text-xs text-red-700 mt-1">
                {errors.dates}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading || sent}
            className="mt-2 bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-aegean)]"
          >
            {loading ? (
              <>
                <Spinner size={14} />
                Sending...
              </>
            ) : sent ? (
              <>
                <Check size={16} />
                {settings.offer.successLabel}
              </>
            ) : (
              settings.offer.submitLabel
            )}
          </Button>
          <p className="text-xs text-[var(--color-muted)] text-center mt-1">
            {settings.offer.replyNote}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
