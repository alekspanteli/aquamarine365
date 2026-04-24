'use client';

import { createContext, useContext } from 'react';

const VillasContext = createContext([]);

export function VillasProvider({ villas, children }) {
  return <VillasContext.Provider value={villas ?? []}>{children}</VillasContext.Provider>;
}

export function useVillas() {
  return useContext(VillasContext);
}
