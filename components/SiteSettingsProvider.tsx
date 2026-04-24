'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteSettings } from '@/types/domain';
import { defaultSiteSettings } from '@/sanity/defaults/siteSettings';

const SiteSettingsContext = createContext<SiteSettings | undefined>(undefined);

interface SiteSettingsProviderProps {
  settings?: SiteSettings;
  children: ReactNode;
}

export function SiteSettingsProvider({ settings, children }: SiteSettingsProviderProps) {
  return (
    <SiteSettingsContext.Provider value={settings ?? defaultSiteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider.');
  }

  return context;
}
