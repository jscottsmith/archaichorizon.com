import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface AudioState {
  // Audio element ref
  audioRef: HTMLAudioElement | null;

  // Playback state
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  bufferedProgress: number;

  // Actions
  setAudioRef: (ref: HTMLAudioElement | null) => void;
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setBufferedProgress: (progress: number) => void;
  resetForNewTrack: () => void;
}

export const useAudio = create<AudioState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      // Initial state
      audioRef: null,
      isPlaying: false,
      isLoading: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      isMuted: false,
      bufferedProgress: 0,

      // Actions
      setAudioRef: (ref) => {
        set({ audioRef: ref });

        if (ref) {
          // Set up event listeners
          const updateTime = () => set({ currentTime: ref.currentTime });
          const updateDuration = () => set({ duration: ref.duration });
          const handlePlay = () => set({ isPlaying: true });
          const handlePause = () => set({ isPlaying: false });
          const handleLoadStart = () => set({ isLoading: true });
          const handleCanPlay = () => {
            set({ isLoading: false });
            // If we were supposed to be playing, resume now that the track is ready
            const { isPlaying } = get();
            if (isPlaying) {
              ref.play().catch(console.error);
            }
          };
          const handleProgress = () => {
            // Calculate buffered progress
            if (ref.buffered.length > 0 && ref.duration > 0) {
              const bufferedEnd = ref.buffered.end(ref.buffered.length - 1);
              const progress = bufferedEnd / ref.duration;
              set({ bufferedProgress: progress });
            }
          };

          ref.addEventListener("timeupdate", updateTime);
          ref.addEventListener("loadedmetadata", updateDuration);
          ref.addEventListener("play", handlePlay);
          ref.addEventListener("pause", handlePause);
          ref.addEventListener("loadstart", handleLoadStart);
          ref.addEventListener("canplay", handleCanPlay);
          ref.addEventListener("progress", handleProgress);

          // Store cleanup function for later use
          const cleanup = () => {
            ref.removeEventListener("timeupdate", updateTime);
            ref.removeEventListener("loadedmetadata", updateDuration);
            ref.removeEventListener("play", handlePlay);
            ref.removeEventListener("pause", handlePause);
            ref.removeEventListener("loadstart", handleLoadStart);
            ref.removeEventListener("canplay", handleCanPlay);
            ref.removeEventListener("progress", handleProgress);
          };

          // Store cleanup function in the ref for later access
          (ref as HTMLAudioElement & { _cleanup?: () => void })._cleanup =
            cleanup;
        }
      },

      play: async () => {
        const { audioRef } = get();
        if (!audioRef) return;

        try {
          await audioRef.play();
        } catch (error) {
          console.error("Failed to play audio:", error);
        }
      },

      pause: () => {
        const { audioRef } = get();
        if (!audioRef) return;

        audioRef.pause();
      },

      seek: (time: number) => {
        const { audioRef, duration } = get();
        if (!audioRef || duration <= 0) return;

        const clampedTime = Math.max(0, Math.min(time, duration));
        audioRef.currentTime = clampedTime;
        set({ currentTime: clampedTime });
      },

      setVolume: (newVolume: number) => {
        const { audioRef, isMuted } = get();
        if (!audioRef) return;

        const clampedVolume = Math.max(0, Math.min(newVolume, 1));
        set({ volume: clampedVolume });
        audioRef.volume = clampedVolume;

        if (clampedVolume === 0) {
          set({ isMuted: true });
        } else if (isMuted) {
          set({ isMuted: false });
        }
      },

      toggleMute: () => {
        const { audioRef, volume, isMuted } = get();
        if (!audioRef) return;

        if (isMuted) {
          audioRef.volume = volume;
          set({ isMuted: false });
        } else {
          audioRef.volume = 0;
          set({ isMuted: true });
        }
      },

      setCurrentTime: (time: number) => set({ currentTime: time }),
      setDuration: (duration: number) => set({ duration }),
      setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      setBufferedProgress: (progress: number) =>
        set({ bufferedProgress: progress }),

      resetForNewTrack: () => {
        set({
          currentTime: 0,
          bufferedProgress: 0,
        });
      },
    })),
    {
      name: "audio-store", // unique name for localStorage key
      partialize: (state) => ({
        // Only persist these state properties, not the audio element ref or actions
        volume: state.volume,
        isMuted: state.isMuted,
        currentTime: state.currentTime,
        duration: state.duration,
        // isPlaying: state.isPlaying,
        // isLoading: state.isLoading,
        // bufferedProgress: state.bufferedProgress,
      }),
    }
  )
);

// Cleanup function to remove event listeners when component unmounts
export const cleanupAudioStore = () => {
  const { audioRef } = useAudio.getState();
  const audioWithCleanup = audioRef as HTMLAudioElement & {
    _cleanup?: () => void;
  };
  if (audioWithCleanup && audioWithCleanup._cleanup) {
    audioWithCleanup._cleanup();
  }
};
