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
      <DrawerContent className={cn("max-h-[100vh] h-[90vh]", className)}>
        <DrawerHeader className="pb-2">
          <DrawerTitle className="sr-only">Player Controls</DrawerTitle>
          <DrawerDescription className="sr-only">
            Media player controls including play/pause, track navigation, volume
            control, and track information
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-6 flex flex-col gap-8">
          <CoverArtCarousel
            className="max-w-1/2 w-full mx-auto"
            images={images}
          />
          {/* <div className="flex items-center">
            <CoverImage size={128} className="rounded-lg mx-auto" />
          </div> */}
          {currentTrack?.catNo ? (
            <Link
              href={buildReleaseRoute(currentTrack.catNo)}
              className="hover:bg-accent/50 transition-colors rounded-md p-1.5 -ml-1.5 -mt-1.5"
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
      </DrawerContent>
    </Drawer>
  );
}
