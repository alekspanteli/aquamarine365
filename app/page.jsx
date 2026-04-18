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
import { villas } from '@/data/villas';

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ProgressBar />
      <Nav />
      <main id="main">
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
    </>
  );
}
