'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from '@phosphor-icons/react/dist/ssr';

// Modern React 19 "is-hydrated" detection via useSyncExternalStore —
// avoids the setState-in-effect anti-pattern that ESLint flags and that
// the old `useEffect(() => setMounted(true), [])` idiom relied on.
const subscribe = () => () => {};
function useIsHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export default function ThemeToggle({ className = '' }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const hydrated = useIsHydrated();

  const active = resolvedTheme || theme;
  const next = active === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={hydrated ? `Switch to ${next} mode` : 'Toggle theme'}
      className={`relative inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--fg)] transition ${className}`}
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${hydrated && active === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${hydrated && active === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
      />
    </button>
  );
}
