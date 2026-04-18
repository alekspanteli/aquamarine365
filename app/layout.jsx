import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL('https://aquamarine365.com'),
  title: 'Aquamarine — Ayia Napa Villas & Suites, Run Like a Five-Star Hotel',
  description:
    'Private seafront villas in Ayia Napa, Cyprus. Book direct, skip the platform fees, and arrive to a home that\'s cleaned, stocked, and staffed 24/7.',
  openGraph: {
    title: 'Aquamarine — Ayia Napa Villas Run Like a Five-Star Hotel',
    description:
      'Private villas in Ayia Napa. Book direct, skip the fees, 24/7 on-island support.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
