"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { MediaPlayerControls } from "./MediaPlayerControls";
import { TrackProgress } from "./TrackProgress";

// Export all individual components
export { CoverImage } from "./CoverImage";
export { ArtistInfo } from "./ArtistInfo";
export { TrackProgress } from "./TrackProgress";
export { MainControls } from "./MainControls";
export { VolumeControl } from "./VolumeControl";
export { PlaylistToggle } from "./PlaylistToggle";
export { TrackInfo } from "./TrackInfo";
export { MediaPlayerControls } from "./MediaPlayerControls";
export { MediaPlayerMobile } from "./MediaPlayerMobile";

// Export button components
export { PreviousButton } from "./PreviousButton";
export { PlayPauseButton } from "./PlayPauseButton";
export { NextButton } from "./NextButton";

// Main MediaPlayer Component
export function MediaPlayer({ className }: { className?: string }) {
  return (
    <Card className={cn("p-4 space-y-4 rounded-lg", className)}>
      <MediaPlayerControls />
      <TrackProgress />
    </Card>
  );
}
