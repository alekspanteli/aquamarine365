'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Mount non-critical client UI after hydration and idle time.
const Toaster = dynamic(async () => (await import('@/components/ui/sonner')).Toaster, {
  ssr: false
});
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

export default function DeferredClient() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const scheduleIdle = window.requestIdleCallback;

    if (typeof scheduleIdle === 'function') {
      idleId = scheduleIdle(() => setReady(true));
    } else {
      timeoutId = window.setTimeout(() => setReady(true), 300);
    }

    return () => {
      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      <Toaster />
      <CookieBanner />
      <Chat />
    </>
  );
}
