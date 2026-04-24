'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Villa } from '@/types/domain';

const VillasContext = createContext<Villa[] | undefined>(undefined);

interface VillasProviderProps {
  villas?: Villa[];
  children: ReactNode;
}

export function VillasProvider({ villas, children }: VillasProviderProps) {
  return <VillasContext.Provider value={villas ?? []}>{children}</VillasContext.Provider>;
}

export function useVillas(): Villa[] {
  const context = useContext(VillasContext);

  if (!context) {
    throw new Error('useVillas must be used within VillasProvider.');
  }

  return context;
}
