"use client";

import React from "react";
import { useAudio } from "../../stores/audioStore";
import { usePlaylist } from "../../stores/playlistStore";
import { Button } from "../ui/button";
import { Play, Pause, Loader2 } from "lucide-react";

export const PlayPauseButton = React.memo(function PlayPauseButton({
  iconSize = 24,
  className,
}: {
  iconSize?: number;
  className?: string;
}) {
  const isPlaying = useAudio((state) => state.isPlaying);
  const isLoading = useAudio((state) => state.isLoading);
  const play = useAudio((state) => state.play);
  const pause = useAudio((state) => state.pause);
  const currentTrack = usePlaylist((state) => state.currentTrack);

  const handlePlay = async () => {
    await play();
  };

  const handlePause = () => {
    pause();
  };

  const handleClick = isPlaying ? handlePause : handlePlay;
  const isDisabled = !currentTrack?.url || isLoading;
  const ariaLabel = isLoading ? "Loading" : isPlaying ? "Pause" : "Play";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isDisabled}
      className={className}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : isPlaying ? (
        <Pause size={iconSize} fill="currentColor" />
      ) : (
        <Play size={iconSize} fill="currentColor" />
      )}
    </Button>
  );
});
