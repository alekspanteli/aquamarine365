import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Clarity from '@/components/Clarity';
import StayCarousel from '@/components/StayCarousel';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Offer from '@/components/Offer';
import Footer from '@/components/Footer';
import { villas } from '@/data/villas';

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Clarity />
        <StayCarousel villas={villas} />
        <WhyUs />
        <HowItWorks />
        <Testimonials />
        <Offer />
      </main>
      <Footer />
    </>
  );
}
