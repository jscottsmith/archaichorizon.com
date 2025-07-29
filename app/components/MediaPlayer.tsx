"use client";

import { useState } from "react";

interface MediaPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isPlaying?: boolean;
  currentTrackIndex?: number;
  totalTracks?: number;
}

export function MediaPlayer({
  src,
  title,
  artist,
  onPlay,
  onPause,
  onEnded,
  onNext,
  onPrevious,
  currentTrackIndex = 0,
  totalTracks = 1,
}: MediaPlayerProps) {
  const [internalIsPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const handleNext = () => {
    onNext?.();
  };

  const handlePrevious = () => {
    onPrevious?.();
  };

  return (
    <div className="p-4 flex gap-4 items-center">
      {/* Track info */}
      {(title || artist) && (
        <div className="w-1/3">
          {title && <h3 className="font-semibold">{title}</h3>}
          {artist && <p className="text-sm text-gray-600">{artist}</p>}
          {totalTracks > 1 && (
            <p className="text-xs text-gray-500">
              Track {currentTrackIndex + 1} of {totalTracks}
            </p>
          )}
        </div>
      )}

      {/* Navigation controls */}
      {totalTracks > 1 && (
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentTrackIndex === 0}
            className="px-3 py-1 text-sm hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label="Previous track"
          >
            ⏮
          </button>
          <button
            onClick={handleNext}
            disabled={currentTrackIndex === totalTracks - 1}
            className="px-3 py-1 text-sm hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label="Next track"
          >
            ⏭
          </button>
        </div>
      )}

      {/* HTML5 Audio element with native controls */}
      <audio
        src={src}
        controls
        className="flex-1"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
