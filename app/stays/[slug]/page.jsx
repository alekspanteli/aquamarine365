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

export function generateMetadata({ params }) {
  const v = getVilla(params.slug);
  if (!v) return {};
  return {
    title: `${v.name} — Aquamarine Ayia Napa`,
    description: v.tagline
  };
}

export default function VillaPage({ params }) {
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
    </>
  );
}
