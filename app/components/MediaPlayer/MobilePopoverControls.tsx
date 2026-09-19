"use client";

import Link from "next/link";
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
import { usePlaylist, selectCurrentTrack } from "@/app/stores/playlistStore";
import { buildReleaseRoute } from "../../utils/url";

export function MobilePopoverControls(props: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}) {
  const currentTrack = usePlaylist(selectCurrentTrack);

  const images = currentTrack?.images?.cover
    ? [
        {
          url: currentTrack.images.cover,
          alt: `${currentTrack.title} cover art`,
        },
      ]
    : [];

  function close() {
    props.onOpenChange(false);
  }

  return (
    <Drawer
      open={props.isOpen}
      onOpenChange={props.onOpenChange}
      showSwipeHandle
    >
      <DrawerContent className={props.className}>
        <DrawerHeader className="pb-2">
          <DrawerTitle className="sr-only">Player Controls</DrawerTitle>
          <DrawerDescription className="sr-only">
            Media player controls including play/pause, track navigation, volume
            control, and track information
          </DrawerDescription>
        </DrawerHeader>
        <div className="panel-scroll-fade min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full flex-col gap-8 overflow-y-auto overscroll-contain px-6 pb-6">
            <CoverArtCarousel
              className="mx-auto w-1/2 max-w-3xs"
              images={images}
            />
            <div className="mx-auto flex w-full max-w-md flex-col gap-8">
              {currentTrack?.catNo ? (
                <Link
                  href={buildReleaseRoute(currentTrack.catNo)}
                  className="-mt-1.5 -ml-1.5 rounded-md p-1.5 transition-colors hover:bg-accent/50"
                  onClick={close}
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
              <VolumeControl className="w-full" expanded />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
