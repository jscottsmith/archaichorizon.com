"use client";

import React from "react";
import { useAudio } from "../../stores/audioStore";
import { usePlaylist } from "../../stores/playlistStore";
import { Button } from "../ui/button";
import { SkipBack, SkipForward, Play, Pause, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const MainControls = React.memo(function MainControls({
  className,
}: {
  className?: string;
}) {
  const isPlaying = useAudio((state) => state.isPlaying);
  const isLoading = useAudio((state) => state.isLoading);
  const play = useAudio((state) => state.play);
  const pause = useAudio((state) => state.pause);
  const nextTrack = usePlaylist((state) => state.nextTrack);
  const previousTrack = usePlaylist((state) => state.previousTrack);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);

  const handlePlay = async () => {
    await play();
  };

  const handlePause = () => {
    pause();
  };

  const handleNext = () => {
    nextTrack();
  };

  const handlePrevious = () => {
    previousTrack();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 md:gap-2 lg:gap-4",
        className
      )}
    >
      {totalTracks > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          disabled={currentTrackIndex === 0}
          aria-label="Previous track"
        >
          <SkipBack size={20} />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={isPlaying ? handlePause : handlePlay}
        disabled={!currentTrack?.url || isLoading}
        className="h-12 w-12"
        aria-label={isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <Loader2 size={24} className="animate-spin" />
        ) : isPlaying ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" />
        )}
      </Button>

      {totalTracks > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={currentTrackIndex === totalTracks - 1}
          aria-label="Next track"
        >
          <SkipForward size={20} />
        </Button>
      )}
    </div>
  );
});
