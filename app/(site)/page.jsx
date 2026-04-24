import Nav from '@/components/Nav';
import ProgressBar from '@/components/ProgressBar';
import Hero from '@/components/Hero';
import Clarity from '@/components/Clarity';
import StayCarousel from '@/components/StayCarousel';
import WhyUs from '@/components/WhyUs';
import Compare from '@/components/Compare';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Offer from '@/components/Offer';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { getVillas } from '@/sanity/fetchVillas';
import { getSiteSettings } from '@/sanity/fetchContent';

export const metadata = {
  alternates: { canonical: '/' }
};

export default async function Page() {
  const [villas, settings] = await Promise.all([getVillas(), getSiteSettings()]);
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: settings.organization.legalName || settings.title,
    url: settings.siteUrl,
    telephone: settings.contact.phone.replace(/\s+/g, ''),
    email: settings.contact.email,
    priceRange: settings.organization.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.organization.streetAddress,
      addressLocality: settings.organization.addressLocality,
      postalCode: settings.organization.postalCode,
      addressCountry: settings.organization.addressCountry
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: settings.organization.ratingValue,
      reviewCount: settings.organization.reviewCount,
      bestRating: settings.organization.bestRating
    },
    areaServed: settings.organization.areaServed
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ProgressBar />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Clarity />
        <StayCarousel villas={villas} />
        <WhyUs />
        <Compare />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Offer />
      </main>
      <Footer />
      <FloatingCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  );
}
