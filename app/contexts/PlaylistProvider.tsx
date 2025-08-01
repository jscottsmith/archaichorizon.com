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
  isPlaying: boolean;

  // Playlist controls
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  selectTrack: (index: number) => void;
  setTracks: (tracks: Track[]) => void;

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
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("isPlaying", isPlaying);

  // Current track
  const currentTrack = tracks[currentTrackIndex];

  // Set tracks function
  const setTracks = useCallback((newTracks: Track[]) => {
    setTracksState(newTracks);
    // Reset to first track when tracks change
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  }, []);

  // Play controls
  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Track navigation
  const nextTrack = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // End of playlist, stop playing
      setIsPlaying(false);
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
      if (!isPlaying) {
        play();
      }
    },
    [tracks.length]
  );

  const value: PlaylistContextType = {
    tracks,
    currentTrackIndex,
    isPlaying,
    play,
    pause,
    nextTrack,
    previousTrack,
    selectTrack,
    setTracks,
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
