import LegalPageCmsContent from '@/components/LegalPageCmsContent';
import { getPrivacyPage } from '@/sanity/fetchContent';

const FALLBACK = {
  title: 'Privacy policy',
  description:
    "How Aquamarine Holiday Rentals handles your personal data: what we collect, why, who it's shared with, and your rights under GDPR."
};

export async function generateMetadata() {
  const page = await getPrivacyPage();

  return {
    title: page?.title || FALLBACK.title,
    description: page?.description || FALLBACK.description,
    alternates: { canonical: '/legal/privacy' }
  };
}

export default async function PrivacyPage() {
  const page = await getPrivacyPage();
  if (page?.body?.length) {
    return <LegalPageCmsContent page={page} />;
  }

  return (
    <>
      <p className="label label-accent mb-3">Privacy policy</p>
      <h1>Your data, plainly.</h1>
      <p className="text-lg mt-4">
        Aquamarine Holiday Rentals (&quot;we&quot;, &quot;us&quot;) manages private villas in
        Ayia Napa, Cyprus. We collect the smallest amount of personal information needed to take
        your booking and run your stay. We do not sell data, we do not run retargeting ads, and we
        delete what we do not need.
      </p>

      <h2>Who we are</h2>
      <p>
        <strong>Aquamarine Holiday Rentals</strong><br />
        61 Tefkrou Anthia, Ayia Napa 5330, Cyprus<br />
        <a href="mailto:info@aquamarine365.com">info@aquamarine365.com</a> · <a href="tel:+35797494941">+357 97 494 941</a>
      </p>
      <p>
        Licensed by the Cyprus Deputy Ministry of Tourism (CY-DMT). We are the data controller for
        information collected through this website.
      </p>

      <h2>What we collect</h2>
      <h3>When you enquire or book</h3>
      <ul>
        <li>Name and email address</li>
        <li>Phone number (if you include it)</li>
        <li>Dates, number of guests, and any requests you describe</li>
        <li>Payment details - handled by <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe</a>, never stored on our servers</li>
      </ul>

      <h3>When you visit the site</h3>
      <ul>
        <li>
          Standard server logs (IP address, user agent, referer) retained by our host,{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel</a>,
          for up to 30 days for security and debugging.
        </li>
        <li>
          Local preferences saved in your own browser. See our{' '}
          <a href="/legal/cookies">cookie policy</a> for the full list - none of it is sent to us.
        </li>
      </ul>

      <h2>What we do with it</h2>
      <ul>
        <li>Reply to your enquiry and issue a booking confirmation</li>
        <li>Process payment for your stay</li>
        <li>Contact you about arrival logistics, check-in codes, and on-island support</li>
        <li>Comply with Cypriot tourism-registration and tax requirements (guest registration is a legal obligation)</li>
        <li>Ask, occasionally, if you&apos;d like to leave a review after checkout - you can say no</li>
      </ul>
      <p>
        We do not add you to a newsletter without asking, and we do not share your contact
        details with partner companies, affiliates, or marketers.
      </p>

      <h2>Who sees your data</h2>
      <p>A small, named list of service providers:</p>
      <ul>
        <li><strong>Stripe</strong> - card processing (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
        <li><strong>Vercel</strong> - website hosting (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
        <li><strong>Google</strong> - Maps embeds on villa detail pages (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
        <li><strong>Open-Meteo</strong> - weather forecasts, receives only lat/lng, no personal data (<a href="https://open-meteo.com/en/terms" target="_blank" rel="noopener noreferrer">terms</a>)</li>
        <li><strong>Unsplash</strong> - photography CDN (<a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
        <li>Our <strong>accountant and Cypriot tax authorities</strong>, where law requires</li>
      </ul>
      <p>
        We do not use ad networks or analytics. If that ever changes, we&apos;ll update this page
        and the cookie banner first.
      </p>

      <h2>Where your data lives</h2>
      <p>
        Booking records are held in Cyprus. Emails flow through standard EU-based email infrastructure.
        Our website is served through Vercel&apos;s global CDN. Stripe stores payment data in their
        own geographically-distributed infrastructure. All transfers out of the EEA rely on standard
        contractual clauses with the relevant processor.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li><strong>Booking records</strong> - 7 years (Cypriot accounting-record retention)</li>
        <li><strong>Enquiries that did not convert</strong> - 12 months, then deleted</li>
        <li><strong>Server logs at Vercel</strong> - up to 30 days</li>
        <li><strong>Reviews / testimonials</strong> - for as long as you consent; remove on request</li>
      </ul>

      <h2>Your rights (GDPR)</h2>
      <p>If you&apos;re in the EEA / UK you can:</p>
      <ul>
        <li>Ask for a copy of the data we hold about you</li>
        <li>Ask us to correct anything that is wrong</li>
        <li>Ask us to delete what is not legally required (post-retention deletion is automatic anyway)</li>
        <li>Object to processing or ask us to restrict it</li>
        <li>Receive your data in a portable format</li>
        <li>Complain to the Cypriot <a href="https://www.dataprotection.gov.cy/" target="_blank" rel="noopener noreferrer">Commissioner for Personal Data Protection</a> if you think we&apos;ve got it wrong</li>
      </ul>
      <p>
        To exercise any of these, email{' '}
        <a href="mailto:info@aquamarine365.com">info@aquamarine365.com</a>. We respond within one
        working week.
      </p>

      <h2>Children</h2>
      <p>
        The site is not directed at children under 16. We only collect children&apos;s data in the
        context of a family booking made by an adult (number of guests, cot requirement, etc.), and
        only the minimum needed to host the stay safely.
      </p>

      <h2>Changes</h2>
      <p>
        If we materially change how data is handled, we&apos;ll update this page and show a banner on
        your next visit. Minor edits are logged in the &quot;Last updated&quot; date below.
      </p>

      <p className="text-sm text-[var(--fg-muted)] mt-12">
        Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
      </p>
    </>
  );
}
