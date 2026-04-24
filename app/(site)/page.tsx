import type { Metadata } from 'next';
import Clarity from '@/components/Clarity';
import Compare from '@/components/Compare';
import FAQ from '@/components/FAQ';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Nav from '@/components/Nav';
import Offer from '@/components/Offer';
import ProgressBar from '@/components/ProgressBar';
import StayCarousel from '@/components/StayCarousel';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';
import { getSiteSettings } from '@/sanity/fetchContent';

export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

export default async function Page() {
  const settings = await getSiteSettings();
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
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ProgressBar />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Clarity />
        <StayCarousel />
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
