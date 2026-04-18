'use client';

import { motion } from 'framer-motion';

const reasons = [
  { n: '01', t: 'We answer the phone.', d: 'One local team, on the island, 24/7. Not an overseas call centre. Average response: under 10 minutes.' },
  { n: '02', t: 'No booking fees.', d: 'Book direct and skip the 15–20% platform markup. Same homes, lower total, no checkout surprises.' },
  { n: '03', t: 'Hotel-grade turnover.', d: 'Every villa runs through a 42-point checklist before you arrive. Linens, basics, Wi-Fi — verified, not assumed.' },
  { n: '04', t: 'We know Ayia Napa.', d: 'Twelve years here. We\'ll tell you which beach is quiet on a Saturday and which taverna is worth the drive.' }
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-32 relative" id="why">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <div className="label label-accent mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            Why Aquamarine · 03
          </div>
          <h2>
            Fewer surprises. <em className="italic">Better holidays.</em>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-2)] leading-relaxed">
            We don&apos;t resell other people&apos;s listings. We own the operation — which is why it actually works.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {reasons.map((r) => (
            <motion.article
              key={r.n}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-7 overflow-hidden isolate hover:border-[var(--accent)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="label label-punch mb-5 font-mono text-sm">{r.n}</div>
              <h3 className="font-display text-xl mb-2">{r.t}</h3>
              <p className="text-[var(--fg-2)] text-[0.95rem] leading-relaxed">{r.d}</p>
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition -z-10"
                style={{
                  background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)'
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
