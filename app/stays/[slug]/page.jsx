import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import VillaGallery from '@/components/VillaGallery';
import VillaBody from '@/components/VillaBody';
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
      <Nav />
      <main>
        <VillaBody villa={villa} />
      </main>
      <Footer />
    </>
  );
}
