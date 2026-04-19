'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Toaster + CookieBanner are only needed after hydration; defer so they
// don't bloat the initial JS bundle or block LCP.
const Toaster = dynamic(() => import('@/components/ui/sonner').then((m) => m.Toaster), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

export default function DeferredClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Wait for the browser to be idle before mounting non-critical UI.
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
    const id = ric(() => setReady(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  if (!ready) return null;
  return (
    <>
      <Toaster />
      <CookieBanner />
      <Chat />
    </>
  );
}
