"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { CoverImage } from "./CoverImage";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";
import { MobilePopoverControls } from "./MobilePopoverControls";
import { useMobilePopover } from "@/app/hooks/useMobilePopover";
import { ArtistInfo } from "./ArtistInfo";

export function MediaPlayerMobile({ className }: { className?: string }) {
  const { isOpen, open, close } = useMobilePopover();

  return (
    <>
      <Card
        className={cn(
          "hover:bg-accent/50 mx-auto inline-flex w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-lg p-2 px-2 transition-colors",
          className
        )}
        onClick={open}
      >
        <CoverImage size={48} className="h-12 w-12" />
        <ArtistInfo hideArtist hideAlbum hideTrackNumbers />
        <div
          onClick={(e) => e.stopPropagation()}
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

      <MobilePopoverControls isOpen={isOpen} closePopover={close} />
    </>
  );
}
