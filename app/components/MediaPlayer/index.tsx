"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { MediaPlayerControls } from "./MediaPlayerControls";
import { TrackProgress } from "./TrackProgress";
import { MainControls } from "./MainControls";

// Export all individual components
export { CoverImage } from "./CoverImage";
export { ArtistInfo } from "./ArtistInfo";
export { TrackProgress } from "./TrackProgress";
export { MainControls } from "./MainControls";
export { VolumeControl } from "./VolumeControl";
export { PlaylistToggle } from "./PlaylistToggle";
export { TrackInfo } from "./TrackInfo";
export { MediaPlayerControls } from "./MediaPlayerControls";

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
    <Card className={cn("p-2 rounded-full space-y-1", className)}>
      <MainControls className="justify-center" />
    </Card>
  );
}
