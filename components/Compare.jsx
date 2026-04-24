'use client';

import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react/dist/ssr';

const rows = [
  { label: 'Booking fees', direct: '€0', other: '€120 – €240' },
  { label: 'Who cleans', direct: 'Our local team', other: 'Third-party contractor' },
  { label: 'Who answers at 10pm', direct: 'A person on the island', other: 'Overseas chat bot' },
  { label: 'Cancellation', direct: 'Free to 30 days out', other: 'Strict, partial refund' },
  { label: 'Keys', direct: 'Code or hand-delivered', other: 'Often a lockbox' },
  { label: 'Fridge pre-stock', direct: 'On request, at cost', other: 'Not offered' },
  { label: 'Same night room switch', direct: 'Free when available', other: 'Not available' }
];

export default function Compare() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <div className="label label-accent mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]" />
            The honest comparison
          </div>
          <h2>
            Book direct. <span className="text-[var(--accent)]">Here&apos;s what changes.</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-2)] leading-relaxed">
            Same villa either way. Different experience — and a different total at checkout.
          </p>
        </motion.div>

        <div className="rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-sm">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Aquamarine direct booking compared with major platforms.
            </caption>
            <thead className="hidden md:table-header-group">
              <tr className="bg-[var(--surface-2)]">
                <th scope="col" className="text-left px-8 py-4 label font-normal">
                  Comparison
                </th>
                <th scope="col" className="text-left px-8 py-4 label label-accent font-normal">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_18%,transparent)]" />
                    Aquamarine direct
                  </span>
                </th>
                <th scope="col" className="text-left px-8 py-4 label font-normal">
                  Airbnb / Booking
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="grid md:table-row grid-cols-1 gap-2 px-5 md:px-0 py-4 md:py-0 border-b border-[var(--line)] last:border-b-0 md:hover:bg-[var(--bg-2)]/60 transition-colors"
                >
                  <th
                    scope="row"
                    className="md:px-8 md:py-5 text-left font-medium text-[var(--fg)] md:text-base text-[0.68rem] md:tracking-normal md:normal-case md:font-medium uppercase tracking-wider font-mono md:font-sans text-[var(--fg-muted)] md:text-[var(--fg)] md:w-[40%]"
                  >
                    {r.label}
                  </th>
                  <td className="md:px-8 md:py-5 md:align-middle md:w-[35%]">
                    <span className="inline-flex items-baseline gap-2 md:gap-2.5 text-[var(--fg)] font-medium">
                      <span
                        aria-hidden
                        className="md:hidden font-mono text-[0.58rem] tracking-widest text-[var(--accent)] uppercase shrink-0 w-14"
                      >
                        Direct
                      </span>
                      <Check size={16} className="text-[var(--accent)] shrink-0 self-center" />
                      <span>{r.direct}</span>
                    </span>
                  </td>
                  <td className="md:px-8 md:py-5 md:align-middle">
                    <span className="inline-flex items-baseline gap-2 md:gap-2.5 text-[var(--fg-muted)]">
                      <span
                        aria-hidden
                        className="md:hidden font-mono text-[0.58rem] tracking-widest text-[var(--fg-muted)] uppercase shrink-0 w-14"
                      >
                        Airbnb
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)]/40 shrink-0 self-center" />
                      <span className="line-through decoration-[color:var(--fg-muted)]/40">{r.other}</span>
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
