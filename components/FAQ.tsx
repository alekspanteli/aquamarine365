'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { useSiteSettings } from '@/components/SiteSettingsProvider';

export default function FAQ() {
  const settings = useSiteSettings();

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
            {settings.faq.eyebrow}
          </div>
          <h2>
            {settings.faq.title}{' '}
            <span className="text-[var(--accent)]">{settings.faq.highlight}</span>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible defaultValue="q-0" className="border-t border-[var(--line)]">
          {settings.faq.items.map((item, i) => (
            <AccordionItem key={item.question} value={`q-${i}`}>
              <AccordionTrigger>
                <span className="flex items-baseline gap-5 flex-1">
                  <span className="label !text-[0.7rem] w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg md:text-2xl tracking-tight">
                    {item.question}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pl-12 pr-12 text-[var(--fg-2)] leading-relaxed max-w-[62ch]">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
