import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Track } from "@/app/utils/tracks";

interface PlaylistState {
  // Playlist state
  tracks: Track[];
  currentTrackIndex: number;
  currentTrack: Track | null;
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
    currentTrack: null,
    isPlaylistVisible: false,

    // Actions
    nextTrack: () => {
      const { currentTrackIndex, tracks } = get();
      if (currentTrackIndex < tracks.length - 1) {
        const newIndex = currentTrackIndex + 1;
        set({
          currentTrackIndex: newIndex,
          currentTrack: tracks[newIndex] || null,
        });
      }
    },

    previousTrack: () => {
      const { currentTrackIndex, tracks } = get();
      if (currentTrackIndex > 0) {
        const newIndex = currentTrackIndex - 1;
        set({
          currentTrackIndex: newIndex,
          currentTrack: tracks[newIndex] || null,
        });
      }
    },

    selectTrack: (index: number) => {
      const { tracks } = get();
      if (index >= 0 && index < tracks.length) {
        set({
          currentTrackIndex: index,
          currentTrack: tracks[index] || null,
        });
      }
    },

    setTracks: (newTracks: Track[], currentTrackIndex?: number) => {
      const trackIndex = currentTrackIndex ?? 0;
      set({
        tracks: newTracks,
        currentTrackIndex: trackIndex,
        currentTrack: newTracks[trackIndex] || null,
      });
    },

    togglePlaylist: () => {
      const { isPlaylistVisible } = get();
      set({ isPlaylistVisible: !isPlaylistVisible });
    },
  }))
);
