'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LoaderContextType = {
  hasLoaded: boolean;
  markAsLoaded: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  // Inicialmente false para que el loader esté presente desde el primer frame sin parpadeo
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hitlabs_initial_loader_shown') === 'true') {
        setHasLoaded(true);
      }
    } catch (e) {}
  }, []);

  const markAsLoaded = () => {
    setHasLoaded(true);
    try {
      sessionStorage.setItem('hitlabs_initial_loader_shown', 'true');
    } catch (e) {}
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
