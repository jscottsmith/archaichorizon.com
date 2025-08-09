"use client";

import React from "react";
import { usePlaylist } from "../../stores/playlistStore";
import { Button } from "../ui/button";
import { SkipForward } from "lucide-react";

export const NextButton = React.memo(function NextButton({
  iconSize = 20,
}: {
  iconSize?: number;
}) {
  const nextTrack = usePlaylist((state) => state.nextTrack);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const totalTracks = usePlaylist((state) => state.tracks.length);

  const handleNext = () => {
    nextTrack();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleNext}
      disabled={totalTracks <= 1 || currentTrackIndex === totalTracks - 1}
      aria-label="Next track"
    >
      <SkipForward size={iconSize} fill="currentColor" />
    </Button>
  );
});
