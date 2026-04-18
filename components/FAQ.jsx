'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

const items = [
  { q: 'Is booking direct actually cheaper?', a: "Yes — you skip the platform service fee (typically 15–20%) and we don't mark up to absorb it. On a €1,800 week, that's €270+ back in your pocket." },
  { q: 'What happens if something breaks during my stay?', a: "Message us on WhatsApp. We're on the island, so the average fix-time is under two hours for anything that matters (A/C, Wi-Fi, hot water). Our average guest-message response is under 10 minutes." },
  { q: 'Can I cancel if my plans change?', a: 'Free cancellation up to 30 days before arrival — full refund of your deposit. Inside 30 days, we refund whatever we can re-book for. No fine print.' },
  { q: 'Do you offer airport pickup?', a: 'Yes. LCA (Larnaca) is about 45 minutes by car. A transfer is €65 one-way, €110 round-trip. We can also arrange rental cars at local rates.' },
  { q: 'Are kids and pets okay?', a: 'Kids, always. Travel cots and high chairs on request at no charge. Dogs welcome at Valerian Palm (fully fenced garden). No pets at Ocean Dreams due to building rules.' },
  { q: 'How do payments work?', a: '30% deposit holds the booking. Balance due two weeks before arrival. We use Stripe — all major cards, Apple Pay, Google Pay. No crypto, no wire transfers, no weird links.' }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container-x max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <div className="label label-accent mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            Questions · 07
          </div>
          <h2>
            The stuff <em className="italic">you were going to ask anyway.</em>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible defaultValue="q-0" className="border-t border-[var(--line)]">
          {items.map((it, i) => (
            <AccordionItem key={it.q} value={`q-${i}`}>
              <AccordionTrigger>
                <span className="flex items-baseline gap-5 flex-1">
                  <span className="label !text-[0.7rem] w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg md:text-2xl tracking-tight">
                    {it.q}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pl-12 pr-12 text-[var(--fg-2)] leading-relaxed max-w-[62ch]">
                  {it.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
