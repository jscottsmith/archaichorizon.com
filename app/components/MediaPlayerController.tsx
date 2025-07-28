"use client";

import { useState, useEffect, useCallback } from "react";
import { IAMetadataResponse, IAFile } from "@/app/types/ia";
import { getAudioFiles } from "@/app/utils/files";
import { replaceUrlParams } from "@/app/utils/url";
import { IA } from "@/app/constants/ia";
import { MediaPlayer } from "./MediaPlayer";

interface MediaPlayerControllerProps {
  metadata: IAMetadataResponse | null;
}

interface TrackInfo {
  title?: string;
  artist?: string;
  url: string;
  index: number;
}

export function MediaPlayerController({
  metadata,
}: MediaPlayerControllerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<TrackInfo[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Process metadata and create track list
  useEffect(() => {
    if (!metadata) {
      setTracks([]);
      setCurrentTrackIndex(0);
      return;
    }

    const audioFiles = getAudioFiles(metadata.files);
    const mp3Tracks = audioFiles.mp3.map((file, index) => ({
      title: file.title || `Track ${index + 1}`,
      artist: file.artist || metadata.metadata.creator,
      url: replaceUrlParams(IA.serve.url, {
        identifier: metadata.metadata.identifier,
        filename: file.name,
      }),
      index,
    }));

    setTracks(mp3Tracks);
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
        onTrackSelect={handleTrackSelect}
      />

      {/* Track list (optional) */}
      {tracks.length > 1 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Track List</h4>
          <div className="space-y-1">
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => handleTrackSelect(index)}
                className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                  index === currentTrackIndex
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100"
                }`}
              >
                {track.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
