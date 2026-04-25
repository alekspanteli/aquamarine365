import type { Metadata } from 'next';
import LegalPageCmsContent from '@/components/LegalPageCmsContent';
import { getTermsPage } from '@/sanity/fetchContent';

const FALLBACK = {
  title: 'Booking terms',
  description:
    'Booking terms, payment, cancellation, and house rules for Aquamarine Holiday Rentals villas in Ayia Napa.'
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTermsPage();

  return {
    title: page?.title || FALLBACK.title,
    description: page?.description || FALLBACK.description,
    alternates: { canonical: '/legal/terms' }
  };
}

export default async function TermsPage() {
  const page = await getTermsPage();
  if (page?.body?.length) {
    return <LegalPageCmsContent page={page} />;
  }

  return (
    <>
      <p className="label label-accent mb-3">Booking terms</p>
      <h1>The short, human version.</h1>
      <p className="text-lg mt-4">
        These are the terms that apply when you book an Aquamarine villa. No hidden fees, no fine
        print surprises. By confirming a reservation you agree to everything below.
      </p>

      <h2>Booking &amp; payment</h2>
      <ul>
        <li><strong>30% deposit</strong> confirms your dates.</li>
        <li><strong>Balance due 14 days before arrival.</strong> If you book inside 14 days, the full amount is due at booking.</li>
        <li>We use <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a> for card payments (Visa, Mastercard, Amex, Apple Pay, Google Pay). No bank transfers, no cash, no crypto.</li>
        <li>Prices are per night in EUR and include VAT. Cleaning is included - no extra fee at checkout.</li>
        <li>A refundable security deposit (EUR 300-EUR 500 depending on villa) is pre-authorised on arrival and released within 7 days of checkout, assuming no damage.</li>
      </ul>

      <h2>Cancellation</h2>
      <ul>
        <li><strong>31+ days before arrival:</strong> full refund of the deposit.</li>
        <li><strong>15-30 days before arrival:</strong> deposit kept; balance not due.</li>
        <li><strong>14 days or less:</strong> total rental is due. We refund whatever we can re-book for and return the difference.</li>
        <li><strong>Force-majeure events</strong> (natural disasters, government travel restrictions, airport closures beyond 48 hours): we&apos;ll offer a full credit for a future stay within 12 months.</li>
      </ul>
      <p>We strongly recommend travel insurance that covers cancellation.</p>

      <h2>Arrival &amp; departure</h2>
      <ul>
        <li><strong>Check-in:</strong> 16:00 onwards. Self check-in with a door code, or a meet-and-greet on request.</li>
        <li><strong>Check-out:</strong> by 11:00. Late check-out subject to availability - ask us.</li>
        <li>We share the exact address, Google Maps pin, and the key-code 24 hours before arrival.</li>
        <li>Airport transfer from LCA (Larnaca): EUR 65 one-way, EUR 110 round-trip - bookable in advance.</li>
      </ul>

      <h2>During your stay</h2>
      <ul>
        <li>Maximum occupancy is listed on each villa page (2 / 6 / 10 guests). No extra unregistered overnight guests.</li>
        <li>
          <strong>No parties, no events</strong> - these are residential properties in quiet
          neighbourhoods. If noise exceeds reasonable levels after 23:00, we reserve the right to
          end the stay without refund.
        </li>
        <li><strong>Smoking</strong> only in the outdoor areas, and never near dry vegetation.</li>
        <li><strong>Pets</strong> - dogs welcome at Valerian Palm only; must be declared at booking.</li>
        <li>Breakages happen. Tell us; honest disclosure is always cheaper than discovery.</li>
        <li>The pool is unsupervised. Children must be accompanied by an adult at all times.</li>
      </ul>

      <h2>Guest registration</h2>
      <p>
        Cypriot law requires us to register every guest with the national tourism authority. At
        booking we&apos;ll ask for each guest&apos;s full name and passport / ID number. This is a
        legal obligation; we do not use this information for anything else. See our{' '}
        <a href="/legal/privacy">privacy policy</a>.
      </p>

      <h2>Liability</h2>
      <p>
        We take reasonable steps to keep each villa safe, clean, and as advertised. You accept
        responsibility for your party&apos;s behaviour, safety around the pool, and damage beyond
        fair wear and tear. We carry standard public-liability insurance for the properties; your
        travel insurance is expected to cover your own belongings and health.
      </p>

      <h2>Problems &amp; complaints</h2>
      <p>
        WhatsApp or call <a href="tel:+35797494941">+357 97 494 941</a> the moment something isn&apos;t
        right. Average fix time on the island is under two hours. If an issue can&apos;t be resolved
        during your stay and you want to raise it formally, email{' '}
        <a href="mailto:info@aquamarine365.com">info@aquamarine365.com</a> within 30 days of
        departure with photos and we&apos;ll respond in writing within 14 days.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the law of the Republic of Cyprus. Any dispute that can&apos;t
        be resolved between us will be settled by the courts of Cyprus.
      </p>

      <p className="text-sm text-[var(--fg-muted)] mt-12">
        Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
      </p>
    </>
  );
}
