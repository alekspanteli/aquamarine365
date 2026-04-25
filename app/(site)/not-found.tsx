import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-x py-24 md:py-36 min-h-[60vh] flex flex-col items-start gap-6">
        <span className="label label-accent">404</span>
        <h1 className="font-display max-w-[18ch]">
          We couldn&apos;t find that page.
        </h1>
        <p className="text-[var(--fg-2)] max-w-[52ch] leading-relaxed">
          The link may be out of date, or the page has moved. Browse our villas or head back to the homepage.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center px-5 h-11 rounded-full bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition"
          >
            Back to home
          </Link>
          <Link
            href="/#stays"
            className="inline-flex items-center px-5 h-11 rounded-full border border-[var(--line)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
          >
            See the villas
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
