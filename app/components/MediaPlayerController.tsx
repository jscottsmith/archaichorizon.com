"use client";

import { useState, useCallback, Suspense, useMemo } from "react";
import { normalizeTracks } from "@/app/utils/tracks";
import { MediaPlayer } from "./MediaPlayer";
import { TrackList } from "./TrackList";
import { useRelease } from "../hooks/useRelease";

function MediaPlayerControllerContent({ catNo }: { catNo?: string }) {
  const { data: metadata } = useRelease(catNo);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Process metadata and create normalized track list
  const tracks = useMemo(() => {
    return normalizeTracks(metadata.files, metadata);
  }, [metadata]);

  // Handle track completion and auto-advance
  const handleTrackEnd = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // End of playlist, stop playing
      setIsPlaying(false);
    }
  }, [currentTrackIndex, tracks.length]);

  // Handle play/pause state changes
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Skip to next track
  const handleNextTrack = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }, [currentTrackIndex, tracks.length]);

  // Skip to previous track
  const handlePreviousTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  }, [currentTrackIndex]);

  // Skip to specific track
  const handleTrackSelect = useCallback(
    (index: number) => {
      if (index >= 0 && index < tracks.length) {
        setCurrentTrackIndex(index);
      }
    },
    [tracks.length]
  );

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="w-full">
      <MediaPlayer
        title={currentTrack?.title}
        artist={currentTrack?.artist}
        src={currentTrack?.url}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleTrackEnd}
        onNext={handleNextTrack}
        onPrevious={handlePreviousTrack}
        isPlaying={isPlaying}
        currentTrackIndex={currentTrackIndex}
        totalTracks={tracks.length}
      />

      <TrackList
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={handleTrackSelect}
      />
    </div>
  );
}

// Main export component that handles Suspense
export function MediaPlayerController({ catNo }: { catNo: string }) {
  return (
    <Suspense
      fallback={
        <div className="p-4">
          <div className="w-full h-16 bg-gray-500/20 rounded-sm animate-pulse" />
        </div>
      }
    >
      <MediaPlayerControllerContent catNo={catNo} />
    </Suspense>
  );
}
