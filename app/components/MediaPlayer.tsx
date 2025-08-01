"use client";

import { usePlaylist } from "../contexts/PlaylistProvider";
import { SkipBack, SkipForward } from "lucide-react";

interface MediaPlayerProps {
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function MediaPlayer({
  onPlay,
  onPause,
  onEnded,
  onNext,
  onPrevious,
}: MediaPlayerProps) {
  const {
    play,
    pause,
    nextTrack,
    previousTrack,
    isPlaying,
    currentTrack,
    currentTrackIndex,
    totalTracks,
  } = usePlaylist();

  const handlePlay = () => {
    play();
    onPlay?.();
  };

  const handlePause = () => {
    pause();
    onPause?.();
  };

  const handleEnded = () => {
    onEnded?.();
  };

  const handleNext = () => {
    nextTrack();
    onNext?.();
  };

  const handlePrevious = () => {
    previousTrack();
    onPrevious?.();
  };

  return (
    <div className="p-4 flex gap-4 items-center">
      {/* Track info */}
      {(currentTrack?.title || currentTrack?.artist) && (
        <div className="w-1/3">
          {currentTrack?.title && (
            <h3 className="font-semibold">{currentTrack?.title}</h3>
          )}
          {currentTrack?.artist && (
            <p className="text-sm text-gray-600">{currentTrack?.artist}</p>
          )}
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
            <SkipBack size={16} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentTrackIndex === totalTracks - 1}
            className="px-3 py-1 text-sm hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label="Next track"
          >
            <SkipForward size={16} />
          </button>
        </div>
      )}

      {/* HTML5 Audio element with native controls */}
      {currentTrack?.url && (
        <audio
          autoPlay={isPlaying}
          src={currentTrack.url}
          controls
          className="flex-1"
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          preload="metadata"
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
