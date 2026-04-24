'use client';

import { createContext, useContext } from 'react';
import { defaultSiteSettings } from '@/sanity/defaults/siteSettings';

const SiteSettingsContext = createContext(defaultSiteSettings);

export function SiteSettingsProvider({ settings, children }) {
  return (
    <SiteSettingsContext.Provider value={settings ?? defaultSiteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
