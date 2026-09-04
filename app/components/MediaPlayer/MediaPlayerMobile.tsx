"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { CoverImage } from "./CoverImage";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";
import { ArtistInfo } from "./ArtistInfo";
import { PlaylistToggle } from "./PlaylistToggle";
import { ids } from "@/app/constants/ids";

export function MediaPlayerMobile({ className }: { className?: string }) {
  return (
    <Card
      id={ids.mediaPlayerMobile}
      className={cn(
        "mx-auto inline-flex w-full flex-row items-center justify-between gap-2 p-2",
        className
      )}
    >
      <CoverImage size={48} className="h-12 w-12 shrink-0" />
      <ArtistInfo hideArtist hideAlbum hideTrackNumbers />
      <div className="flex items-center justify-center gap-1">
        <PreviousButton iconSize={20} />
        <PlayPauseButton iconSize={20} />
        <NextButton iconSize={20} />
        <PlaylistToggle />
      </div>
    </Card>
  );
}
