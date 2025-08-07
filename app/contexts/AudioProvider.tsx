"use client";

import React, { useRef, useEffect } from "react";
import { usePlaylist, useCurrentTrack } from "../stores/playlistStore";
import {
  useAudio as useAudioStore,
  cleanupAudioStore,
} from "@/app/stores/audioStore";

export function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current track from playlist store
  const { nextTrack } = usePlaylist();
  const currentTrack = useCurrentTrack();

  // Get audio store actions and state
  const { setAudioRef, isPlaying, resetForNewTrack } = useAudioStore();

  // Set up audio element ref
  useEffect(() => {
    setAudioRef(audioRef.current);

    // Sync persisted state with audio element when it's available
    if (audioRef.current) {
      const { volume, isMuted } = useAudioStore.getState();
      audioRef.current.volume = isMuted ? 0 : volume;
    }

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

  return <audio ref={audioRef} preload="metadata" autoPlay />;
}
