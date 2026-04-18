import { Fraunces, JetBrains_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL('https://aquamarine365.com'),
  title: 'Aquamarine — Ayia Napa Villas & Suites, Run Like a Five-Star Hotel',
  description:
    "Private seafront villas in Ayia Napa, Cyprus. Book direct, skip the platform fees, and arrive to a home that's cleaned, stocked, and staffed 24/7."
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${GeistSans.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
