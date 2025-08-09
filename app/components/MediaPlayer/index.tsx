"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { MediaPlayerControls } from "./MediaPlayerControls";
import { TrackProgress } from "./TrackProgress";
import { CoverImage } from "./CoverImage";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";

// Export all individual components
export { CoverImage } from "./CoverImage";
export { ArtistInfo } from "./ArtistInfo";
export { TrackProgress } from "./TrackProgress";
export { MainControls } from "./MainControls";
export { VolumeControl } from "./VolumeControl";
export { PlaylistToggle } from "./PlaylistToggle";
export { TrackInfo } from "./TrackInfo";
export { MediaPlayerControls } from "./MediaPlayerControls";

// Export button components
export { PreviousButton } from "./PreviousButton";
export { PlayPauseButton } from "./PlayPauseButton";
export { NextButton } from "./NextButton";

// Main MediaPlayer Component
export function MediaPlayer({ className }: { className?: string }) {
  return (
    <Card className={cn("p-2 space-y-1", className)}>
      <MediaPlayerControls />
      <TrackProgress />
    </Card>
  );
}

// Mobile MediaPlayer Component
export function MediaPlayerMobile({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "p-2 items-center inline-flex flex-row justify-between w-full px-2 mx-auto",
        className
      )}
    >
      <CoverImage size={48} />
      <div
        className={cn(
          "flex items-center justify-center gap-1 md:gap-2 lg:gap-4",
          className
        )}
      >
        <PreviousButton iconSize={20} />
        <PlayPauseButton iconSize={20} />
        <NextButton iconSize={20} />
      </div>
    </Card>
  );
}
