import LegalPageCmsContent from '@/components/LegalPageCmsContent';
import { getCookiePage } from '@/sanity/fetchContent';

const FALLBACK = {
  title: 'Cookie policy',
  description:
    'Exactly what Aquamarine stores on your device and why. No third-party tracking, no analytics, no marketing cookies.'
};

export async function generateMetadata() {
  const page = await getCookiePage();

  return {
    title: page?.title || FALLBACK.title,
    description: page?.description || FALLBACK.description,
    alternates: { canonical: '/legal/cookies' }
  };
}

export default async function CookiesPage() {
  const page = await getCookiePage();
  if (page?.body?.length) {
    return <LegalPageCmsContent page={page} />;
  }

  return (
    <>
      <p className="label label-accent mb-3">Cookie policy</p>
      <h1>What we store on your device.</h1>
      <p className="text-lg mt-4">
        Short version: we do not use analytics, tracking pixels, or marketing cookies. Everything
        below is stored locally in your own browser to make the site remember basic preferences.
      </p>

      <h2>What we set</h2>
      <p>Three things, all local to your browser - none are sent to our servers or any third party.</p>

      <h3>Cookie consent (<code>aq-cookie-consent</code>)</h3>
      <p>
        Stored in <strong>localStorage</strong>. Records whether you pressed <em>Accept</em>,
        <em> Essential only</em>, or dismissed this notice. Keeps the banner from reappearing on
        every page load. Values: <code>accepted</code>, <code>essential</code>, or <code>dismissed</code>.
      </p>

      <h3>Theme preference (<code>theme</code>)</h3>
      <p>
        Stored in <strong>localStorage</strong> by <a href="https://github.com/pacocoursey/next-themes" target="_blank" rel="noopener noreferrer">next-themes</a>.
        Remembers whether you chose light mode, dark mode, or matched your system.
      </p>

      <h3>Chat history (<code>aq-chat-history</code>)</h3>
      <p>
        Stored in <strong>sessionStorage</strong> - wiped automatically when you close the tab.
        Holds the last 30 messages from your conversation with the concierge so reloading the
        page does not lose it. Never sent anywhere; purely local.
      </p>

      <h2>What we do not set</h2>
      <ul>
        <li>No Google Analytics, Plausible, Fathom, or any other analytics script</li>
        <li>No Meta Pixel, TikTok pixel, or other advertising trackers</li>
        <li>No session-replay tools (Hotjar, FullStory, etc.)</li>
        <li>No cross-site tracking cookies</li>
        <li>No remarketing / affiliate cookies</li>
      </ul>

      <h2>Third-party iframes</h2>
      <p>
        Two features embed third-party content. These vendors may set their own cookies on their own
        domains when you interact with them - we do not see or control those cookies:
      </p>
      <ul>
        <li>
          <strong>Google Maps</strong> on villa detail pages (used to show approximate location).
          Google&apos;s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> covers what they collect from map loads.
        </li>
        <li>
          <strong>Unsplash</strong> serves villa and hero photography. Unsplash may log basic
          request data. See their <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
        </li>
      </ul>
      <p>
        We do not embed YouTube, Vimeo, Facebook widgets, or third-party chat tools. The chat on
        this site runs entirely client-side - your messages never leave your browser.
      </p>

      <h2>How to clear what we stored</h2>
      <p>
        Open your browser&apos;s dev tools - Application / Storage tab - delete the <code>aq-*</code>
        entries under Local Storage. Or clear site data for <code>aquamarine365.com</code> from your
        browser&apos;s privacy settings. The cookie banner will reappear next time you visit.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href="mailto:info@aquamarine365.com">info@aquamarine365.com</a> and we&apos;ll answer
        within a working day.
      </p>

      <p className="text-sm text-[var(--fg-muted)] mt-12">
        Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
      </p>
    </>
  );
}
