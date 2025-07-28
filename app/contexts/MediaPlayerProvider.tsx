"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IAMetadataResponse } from "@/app/types/ia";
import { fetchRelease } from "@/app/services";

interface MediaPlayerContextType {
  metadata: IAMetadataResponse | null;
  isLoading: boolean;
  error: Error | null;
  setCatalogId: (catNo: string) => void;
  currentCatalogId: string | null;
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
  const [metadata, setMetadata] = useState<IAMetadataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentCatalogId, setCurrentCatalogId] = useState<string | null>(
    initialCatalogId || null
  );

  const setCatalogId = (catNo: string) => {
    setCurrentCatalogId(catNo);
  };

  useEffect(() => {
    if (!currentCatalogId) {
      setMetadata(null);
      setError(null);
      return;
    }

    const fetchMetadata = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchRelease(currentCatalogId);
        setMetadata(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch metadata")
        );
        setMetadata(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [currentCatalogId]);

  const value: MediaPlayerContextType = {
    metadata,
    isLoading,
    error,
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
