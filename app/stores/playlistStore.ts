import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Track } from "@/app/utils/tracks";

interface PlaylistState {
  // Playlist state
  tracks: Track[];
  currentTrackIndex: number;
  isPlaylistVisible: boolean;

  // Playlist controls
  nextTrack: () => void;
  previousTrack: () => void;
  selectTrack: (index: number) => void;
  setTracks: (tracks: Track[], currentTrackIndex?: number) => void;

  // Playlist visibility
  togglePlaylist: () => void;
}

export const usePlaylist = create<PlaylistState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    tracks: [],
    currentTrackIndex: 0,
    isPlaylistVisible: false,

    // Actions
    nextTrack: () => {
      const { currentTrackIndex, tracks } = get();
      if (currentTrackIndex < tracks.length - 1) {
        set({ currentTrackIndex: currentTrackIndex + 1 });
      }
    },

    previousTrack: () => {
      const { currentTrackIndex } = get();
      if (currentTrackIndex > 0) {
        set({ currentTrackIndex: currentTrackIndex - 1 });
      }
    },

    selectTrack: (index: number) => {
      const { tracks } = get();
      if (index >= 0 && index < tracks.length) {
        set({ currentTrackIndex: index });
      }
    },

    setTracks: (newTracks: Track[], currentTrackIndex?: number) => {
      set({
        tracks: newTracks,
        currentTrackIndex: currentTrackIndex ?? 0,
      });
    },

    togglePlaylist: () => {
      const { isPlaylistVisible } = get();
      set({ isPlaylistVisible: !isPlaylistVisible });
    },
  }))
);

// Selectors for computed values
export const useCurrentTrack = () => {
  return usePlaylist((state) => {
    const { tracks, currentTrackIndex } = state;
    return tracks[currentTrackIndex];
  });
};

export const useTotalTracks = () => {
  return usePlaylist((state) => state.tracks.length);
};
