import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import ProgressBar from '@/components/ProgressBar';
import Footer from '@/components/Footer';
import VillaBody from '@/components/VillaBody';
import FloatingCTA from '@/components/FloatingCTA';
import { villas, getVilla } from '@/data/villas';

export function generateStaticParams() {
  return villas.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const v = getVilla(params.slug);
  if (!v) return {};
  const title = `${v.name} — Aquamarine Ayia Napa`;
  const url = `/stays/${v.slug}`;
  const image = v.cover;
  return {
    title,
    description: v.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description: v.tagline,
      images: image ? [{ url: image, width: 2000, height: 1333, alt: v.name }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: v.tagline,
      images: image ? [image] : undefined
    }
  };
}

function villaJsonLd(v) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: v.name,
    description: v.summary,
    url: `https://aquamarine365.com/stays/${v.slug}`,
    image: v.gallery,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ayia Napa',
      addressCountry: 'CY',
      addressRegion: 'Famagusta'
    },
    geo: v.coords
      ? { '@type': 'GeoCoordinates', latitude: v.coords.lat, longitude: v.coords.lng }
      : undefined,
    amenityFeature: v.amenities?.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a })),
    numberOfRooms: v.bedrooms,
    occupancy: { '@type': 'QuantitativeValue', maxValue: v.sleeps },
    priceRange: `€${v.priceFrom}+ per night`,
    starRating: { '@type': 'Rating', ratingValue: '4.9', bestRating: '5' },
    telephone: '+35797494941',
    email: 'info@aquamarine365.com'
  };
}

export default async function VillaPage(props) {
  const params = await props.params;
  const villa = getVilla(params.slug);
  if (!villa) notFound();

  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <VillaBody villa={villa} />
      </main>
      <Footer />
      <FloatingCTA href="#book" label={`Enquire — from €${villa.priceFrom}/night`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(villaJsonLd(villa)) }}
      />
    </>
  );
}
