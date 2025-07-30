"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MediaPlayerContextType {
  setCatalogId: (catNo: string) => void;
  currentCatalogId?: string;
}

const MediaPlayerContext = createContext<MediaPlayerContextType | undefined>(
  undefined
);

interface MediaPlayerProviderProps {
  children: ReactNode;
  initialCatalogId?: string;
}

export function MediaPlayerProvider({
  children,
  initialCatalogId,
}: MediaPlayerProviderProps) {
  const [currentCatalogId, setCurrentCatalogId] = useState<string | undefined>(
    initialCatalogId
  );

  const setCatalogId = (catNo: string) => {
    setCurrentCatalogId(catNo);
  };

  const value: MediaPlayerContextType = {
    setCatalogId,
    currentCatalogId,
  };

  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
    </MediaPlayerContext.Provider>
  );
}

export function useMediaPlayer() {
  const context = useContext(MediaPlayerContext);
  if (context === undefined) {
    throw new Error("useMediaPlayer must be used within a MediaPlayerProvider");
  }
  return context;
}
