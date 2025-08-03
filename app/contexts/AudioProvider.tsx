"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePlaylist } from "./PlaylistProvider";

interface AudioContextType {
  // Playback controls
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;

  // State
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  bufferedProgress: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bufferedProgress, setBufferedProgress] = useState(0);

  // Get current track from playlist context
  const { currentTrack } = usePlaylist();

  // Update current time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      // If we were supposed to be playing, resume now that the track is ready
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };
    const handleProgress = () => {
      // Calculate buffered progress
      if (audio.buffered.length > 0 && audio.duration > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        const progress = bufferedEnd / audio.duration;
        setBufferedProgress(progress);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("progress", handleProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("progress", handleProgress);
    };
  }, [isPlaying]);

  // Sync audio with playlist track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    // Only set src if it's a different track
    if (audio.src !== currentTrack.url) {
      const wasPlaying = isPlaying;
      audio.src = currentTrack.url;
      setCurrentTime(0);
      setBufferedProgress(0); // Reset buffered progress for new track

      // If it was playing before, keep the isPlaying state true
      // The canplay event will handle resuming playback
      if (wasPlaying) {
        setIsPlaying(true);
      }
    }
  }, [currentTrack?.url, isPlaying]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;

    const clampedTime = Math.max(0, Math.min(time, duration));
    audio.currentTime = clampedTime;
    setCurrentTime(clampedTime);
  };

  const setVolume = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(newVolume, 1));
    setVolumeState(clampedVolume);
    audio.volume = clampedVolume;

    if (clampedVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const value: AudioContextType = {
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    bufferedProgress,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
