"use client";

import { useState, useEffect, useCallback } from "react";
import { IAMetadataResponse } from "@/app/types/ia";
import { normalizeTracks, Track } from "@/app/utils/tracks";
import { MediaPlayer } from "./MediaPlayer";
import { TrackList } from "./TrackList";

interface MediaPlayerControllerProps {
  metadata: IAMetadataResponse | null;
}

export function MediaPlayerController({
  metadata,
}: MediaPlayerControllerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Process metadata and create normalized track list
  useEffect(() => {
    if (!metadata) {
      setTracks([]);
      setCurrentTrackIndex(0);
      return;
    }

    const normalizedTracks = normalizeTracks(metadata.files, metadata);

    setTracks(normalizedTracks);
    setCurrentTrackIndex(0);
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

  if (!metadata || tracks.length === 0) {
    return null;
  }

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
