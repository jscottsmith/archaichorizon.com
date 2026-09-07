"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { CoverImage } from "./CoverImage";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";
import { ArtistInfo } from "./ArtistInfo";
import { PlaylistToggle } from "./PlaylistToggle";
import { MobilePopoverControls } from "./MobilePopoverControls";
import { ids } from "@/app/constants/ids";

export function MediaPlayerMobile({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className={cn(
          "mx-auto inline-flex w-full flex-row items-center justify-between gap-2 p-2",
          className
        )}
      >
        <button
          type="button"
          id={ids.mediaPlayerMobile}
          onClick={() => setIsOpen(true)}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
        >
          <CoverImage size={48} className="h-12 w-12 shrink-0" />
          <ArtistInfo hideArtist hideAlbum hideTrackNumbers />
        </button>
        <div className="flex items-center justify-center gap-1">
          <PreviousButton iconSize={20} />
          <PlayPauseButton iconSize={20} />
          <NextButton iconSize={20} />
          <PlaylistToggle />
        </div>
      </Card>

      <MobilePopoverControls isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
