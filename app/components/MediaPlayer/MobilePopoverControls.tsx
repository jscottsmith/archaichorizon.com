"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { TrackProgress } from "./TrackProgress";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";
import { VolumeControl } from "./VolumeControl";
import { ArtistInfo } from "./ArtistInfo";
import { CoverArtCarousel } from "../CoverArtCarousel";
import { usePlaylist } from "@/app/stores/playlistStore";
import { buildReleaseRoute } from "../../utils/url";

interface MobilePopoverControlsProps {
  isOpen: boolean;
  closePopover: () => void;
  className?: string;
}

export function MobilePopoverControls({
  isOpen,
  closePopover,
  className,
}: MobilePopoverControlsProps) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  const images = currentTrack?.images?.cover
    ? [
        {
          url: currentTrack.images.cover,
          alt: `${currentTrack.title} cover art`,
        },
      ]
    : [];
  return (
    <Drawer open={isOpen} onOpenChange={closePopover}>
      <DrawerContent className={cn("h-[90vh] max-h-[100vh]", className)}>
        <DrawerHeader className="pb-2">
          <DrawerTitle className="sr-only">Player Controls</DrawerTitle>
          <DrawerDescription className="sr-only">
            Media player controls including play/pause, track navigation, volume
            control, and track information
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-8 px-6 pb-6 md:flex-row md:items-center">
          <CoverArtCarousel
            className="max-w-3xs mx-auto w-1/2 md:mr-0"
            images={images}
          />
          <div className="mx-auto flex w-full max-w-md flex-col gap-8 md:ml-0">
            {currentTrack?.catNo ? (
              <Link
                href={buildReleaseRoute(currentTrack.catNo)}
                className="hover:bg-accent/50 -ml-1.5 -mt-1.5 rounded-md p-1.5 transition-colors"
                onClick={closePopover}
              >
                <ArtistInfo />
              </Link>
            ) : (
              <ArtistInfo />
            )}
            <TrackProgress />
            <div className="flex items-center justify-center gap-6">
              <PreviousButton iconSize={24} />
              <PlayPauseButton iconSize={32} />
              <NextButton iconSize={24} />
            </div>
            <VolumeControl className="flex-1" width="w-full" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
