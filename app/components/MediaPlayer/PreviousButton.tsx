"use client";

import React from "react";
import { usePlaylist } from "../../stores/playlistStore";
import { Button } from "../ui/button";
import { SkipBack } from "lucide-react";

export const PreviousButton = React.memo(function PreviousButton({
  iconSize = 20,
}: {
  iconSize?: number;
}) {
  const previousTrack = usePlaylist((state) => state.previousTrack);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const totalTracks = usePlaylist((state) => state.tracks.length);

  const handlePrevious = () => {
    previousTrack();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePrevious}
      disabled={totalTracks <= 1 || currentTrackIndex === 0}
      aria-label="Previous track"
    >
      <SkipBack size={iconSize} fill="currentColor" />
    </Button>
  );
});
