'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LoaderContextType = {
  hasLoaded: boolean;
  markAsLoaded: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  // Inicialmente asumimos true hasta chequear en cliente para evitar flash en SSR
  const [hasLoaded, setHasLoaded] = useState<boolean>(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('hitlabs_initial_loader_shown');
    if (alreadyShown === 'true') {
      setHasLoaded(true);
    } else {
      setHasLoaded(false);
    }
  }, []);

  const markAsLoaded = () => {
    setHasLoaded(true);
    try {
      sessionStorage.setItem('hitlabs_initial_loader_shown', 'true');
    } catch (e) {
      // Ignore in private browsing / sandboxes if storage is blocked
    }
  };

  return (
    <LoaderContext.Provider value={{ hasLoaded, markAsLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
