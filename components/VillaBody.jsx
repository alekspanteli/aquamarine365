'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';
import VillaGallery from './VillaGallery';
import MapEmbed from './MapEmbed';
import Weather from './Weather';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function VillaBody({ villa }) {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState('2');
  const today = new Date();
  return (
    <>
      <section className="pt-8 md:pt-14 pb-6 md:pb-8 bg-[var(--bg-2)]">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/#stays"
              className="inline-flex items-center gap-2 label hover:text-[var(--fg)] transition mb-6"
            >
              <ArrowLeft size={14} />
              All stays
            </Link>

            <div className="label label-accent mb-3">{villa.location}</div>
            <h1 className="font-display max-w-[16ch]">{villa.name}</h1>
            <p className="mt-4 text-lg text-[var(--fg-2)] max-w-[58ch] leading-relaxed">
              {villa.tagline}
            </p>

            <ul className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 py-5 border-y border-[var(--line)]">
              {villa.specs.map((s) => (
                <li key={s.label} className="flex flex-col gap-1">
                  <span className="label !text-[0.68rem]">{s.label}</span>
                  <strong className="font-display text-lg font-medium">{s.value}</strong>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <VillaGallery images={villa.gallery} name={villa.name} />
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16 pb-20 md:pb-32">
        <div className="container-x grid lg:grid-cols-[1.3fr_420px] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-2xl md:text-3xl mb-5">The villa</h2>
            <p className="text-[var(--fg-2)] leading-relaxed text-[1.05rem]">
              {villa.summary}
            </p>

            <h3 className="font-display text-xl mt-12 mb-4">What stands out</h3>
            <ul className="flex flex-col gap-2.5">
              {villa.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="pl-8 text-[var(--fg-2)] relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-5 before:h-px before:bg-[var(--accent)]"
                  dangerouslySetInnerHTML={{ __html: h }}
                />
              ))}
            </ul>

            <h3 className="font-display text-xl mt-12 mb-4">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {villa.amenities.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="flex items-center gap-2.5 text-[var(--fg-2)]"
                >
                  <Check size={15} className="text-[var(--accent)] shrink-0" />
                  {a}
                </motion.li>
              ))}
            </ul>

            <h3 className="font-display text-xl mt-12 mb-4">Location</h3>
            {villa.coords ? (
              <MapEmbed
                lat={villa.coords.lat}
                lng={villa.coords.lng}
                title={`${villa.name} — approximate location`}
                label={villa.location_area ?? 'Ayia Napa, Cyprus'}
              />
            ) : null}
            <p className="text-sm text-[var(--fg-muted)] mt-3">
              Map shows the approximate area. We share the exact address and a welcome pack after booking. Airport transfer (LCA, 45 min) from €65.
            </p>

            {villa.coords ? (
              <div className="mt-8">
                <Weather
                  lat={villa.coords.lat}
                  lng={villa.coords.lng}
                  label={villa.location_area?.split(',')[0] ?? 'Ayia Napa'}
                />
              </div>
            ) : null}
          </motion.div>

          <aside id="book" className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-xl max-w-[480px]"
            >
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="label !text-[0.68rem]">from</span>
                <strong className="font-display text-4xl font-medium">€{villa.priceFrom}</strong>
                <span className="text-sm text-[var(--fg-muted)]">/night</span>
              </div>
              <p className="text-sm text-[var(--fg-muted)] mb-6">
                Rates vary by season. 7+ night discount with code{' '}
                <strong className="font-mono text-[var(--punch)] bg-[var(--punch-soft)] px-1.5 py-0.5 rounded">
                  DIRECT7
                </strong>
                .
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex flex-col gap-1.5">
                  <Label>Check-in</Label>
                  <DatePicker
                    value={checkIn}
                    onChange={setCheckIn}
                    placeholder="Add date"
                    minDate={today}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Check-out</Label>
                  <DatePicker
                    value={checkOut}
                    onChange={setCheckOut}
                    placeholder="Add date"
                    minDate={checkIn || today}
                  />
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <Label>Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(villa.sleeps)].map((_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1} guest{i ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button asChild size="lg" variant="punch" className="w-full mb-4">
                <a
                  href={`mailto:info@aquamarine365.com?subject=Enquiry: ${encodeURIComponent(villa.name)}&body=${encodeURIComponent(
                    `Hi Aquamarine, I'd like to check availability at ${villa.name}.\n\nCheck-in: ${checkIn ? checkIn.toDateString() : '—'}\nCheck-out: ${checkOut ? checkOut.toDateString() : '—'}\nGuests: ${guests}\n\nThanks,`
                  )}`}
                >
                  Enquire now
                  <ArrowRight size={16} />
                </a>
              </Button>

              <ul className="flex flex-col gap-2 pt-4 border-t border-[var(--line)]">
                {[
                  'Reply within 1 hour, 8am–10pm CY',
                  '30% deposit · free cancel 30 days out',
                  'No booking fees · no markup'
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-[var(--fg-2)]">
                    <Check size={14} className="text-[var(--accent)] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>
        </div>
      </section>
    </>
  );
}
