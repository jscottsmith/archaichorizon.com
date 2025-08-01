"use client";

import { usePlaylist } from "../contexts/PlaylistProvider";

interface MediaPlayerProps {
  src?: string;
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
  currentTrackIndex,
  totalTracks,
}: MediaPlayerProps) {
  const {
    play,
    pause,
    nextTrack,
    previousTrack,
    isPlaying,
    currentTrackIndex: contextCurrentTrackIndex,
    totalTracks: contextTotalTracks,
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
      {(title || artist) && (
        <div className="w-1/3">
          {title && <h3 className="font-semibold">{title}</h3>}
          {artist && <p className="text-sm text-gray-600">{artist}</p>}
          {contextTotalTracks > 1 && (
            <p className="text-xs text-gray-500">
              Track {contextCurrentTrackIndex + 1} of {contextTotalTracks}
            </p>
          )}
        </div>
      )}

      {/* Navigation controls */}
      {contextTotalTracks > 1 && (
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={contextCurrentTrackIndex === 0}
            className="px-3 py-1 text-sm hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label="Previous track"
          >
            ⏮
          </button>
          <button
            onClick={handleNext}
            disabled={contextCurrentTrackIndex === contextTotalTracks - 1}
            className="px-3 py-1 text-sm hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label="Next track"
          >
            ⏭
          </button>
        </div>
      )}

      {/* HTML5 Audio element with native controls */}
      {src && (
        <audio
          autoPlay={isPlaying}
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
      )}
    </div>
  );
}
