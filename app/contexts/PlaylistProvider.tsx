"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Track } from "@/app/utils/tracks";

interface PlaylistContextType {
  // Playlist state
  tracks: Track[];
  currentTrackIndex: number;

  // Playlist controls
  nextTrack: () => void;
  previousTrack: () => void;
  selectTrack: (index: number) => void;
  setTracks: (tracks: Track[]) => void;

  // Playlist visibility
  isPlaylistVisible: boolean;
  togglePlaylist: () => void;

  // Current track info
  currentTrack: Track | undefined;
  totalTracks: number;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

interface PlaylistProviderProps {
  children: ReactNode;
  initialTracks?: Track[];
}

export function PlaylistProvider({
  children,
  initialTracks = [],
}: PlaylistProviderProps) {
  const [tracks, setTracksState] = useState<Track[]>(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  // Current track
  const currentTrack = tracks[currentTrackIndex];

  // Set tracks function
  const setTracks = useCallback((newTracks: Track[]) => {
    setTracksState(newTracks);
    // Reset to first track when tracks change
    setCurrentTrackIndex(0);
  }, []);

  // Track navigation
  const nextTrack = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }, [currentTrackIndex, tracks.length]);

  const previousTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  }, [currentTrackIndex]);

  const selectTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < tracks.length) {
        setCurrentTrackIndex(index);
      }
    },
    [tracks.length]
  );

  // Playlist visibility toggle
  const togglePlaylist = useCallback(() => {
    setIsPlaylistVisible((prev) => !prev);
  }, []);

  const value: PlaylistContextType = {
    tracks,
    currentTrackIndex,
    nextTrack,
    previousTrack,
    selectTrack,
    setTracks,
    isPlaylistVisible,
    togglePlaylist,
    currentTrack,
    totalTracks: tracks.length,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
}
