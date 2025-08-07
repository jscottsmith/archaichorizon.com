"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { usePlaylist } from "./PlaylistProvider";
import {
  useAudio as useAudioStore,
  cleanupAudioStore,
} from "@/app/stores/audioStore";

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current track from playlist context
  const { currentTrack, nextTrack } = usePlaylist();

  // Get audio store actions and state
  const { setAudioRef, isPlaying, resetForNewTrack } = useAudioStore();

  // Set up audio element ref
  useEffect(() => {
    setAudioRef(audioRef.current);

    // Cleanup on unmount
    return () => {
      cleanupAudioStore();
      setAudioRef(null);
    };
  }, [setAudioRef]);

  // Sync audio with playlist track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    // Only set src if it's a different track
    if (audio.src !== currentTrack.media.mp3.url) {
      const wasPlaying = isPlaying;
      audio.src = currentTrack.media.mp3.url;
      resetForNewTrack();

      // If it was playing before, keep the isPlaying state true
      // The canplay event will handle resuming playback
      if (wasPlaying) {
        useAudioStore.getState().setIsPlaying(true);
      }
    }
  }, [
    currentTrack?.url,
    currentTrack?.media.mp3.url,
    isPlaying,
    nextTrack,
    resetForNewTrack,
  ]);

  // Handle track ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      useAudioStore.getState().setIsPlaying(false);
      useAudioStore.getState().setCurrentTime(0);
      nextTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextTrack]);

  return (
    <>
      {children}
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" autoPlay className="invisible" />
    </>
  );
}
