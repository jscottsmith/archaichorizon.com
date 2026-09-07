import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Track } from "@/app/utils/tracks";

interface PlaylistState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaylistPanelOpen: boolean;

  nextTrack: () => void;
  previousTrack: () => void;
  selectTrack: (index: number) => void;
  setTracks: (tracks: Track[], currentTrackIndex?: number) => void;

  openPlaylistPanel: () => void;
  closePlaylistPanel: () => void;
  togglePlaylistPanel: () => void;
}

export function selectCurrentTrack(state: {
  tracks: Track[];
  currentTrackIndex: number;
}) {
  return state.tracks[state.currentTrackIndex] ?? null;
}

export const usePlaylist = create<PlaylistState>()(
  subscribeWithSelector((set, get) => ({
    tracks: [],
    currentTrackIndex: 0,
    isPlaylistPanelOpen: false,

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
      if (newTracks.length === 0 && get().tracks.length > 0) {
        return;
      }

      set({
        tracks: newTracks,
        currentTrackIndex: currentTrackIndex ?? 0,
      });
    },

    openPlaylistPanel: () => set({ isPlaylistPanelOpen: true }),

    closePlaylistPanel: () => set({ isPlaylistPanelOpen: false }),

    togglePlaylistPanel: () => {
      const { isPlaylistPanelOpen } = get();
      set({ isPlaylistPanelOpen: !isPlaylistPanelOpen });
    },
  }))
);
