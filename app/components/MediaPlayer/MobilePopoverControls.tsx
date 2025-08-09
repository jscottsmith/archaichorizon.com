"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { CoverImage } from "./CoverImage";
import { TrackProgress } from "./TrackProgress";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";
import { VolumeControl } from "./VolumeControl";
import { ArtistInfo } from "./ArtistInfo";

interface MobilePopoverControlsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MobilePopoverControls({
  isOpen,
  onClose,
  className,
}: MobilePopoverControlsProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className={cn("max-h-[100vh] h-[90vh]", className)}>
        <DrawerHeader className="pb-2">
          <DrawerTitle className="sr-only">Player Controls</DrawerTitle>
          <DrawerDescription className="sr-only">
            Media player controls including play/pause, track navigation, volume
            control, and track information
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-6 flex flex-col gap-8">
          <div className="flex items-center">
            <CoverImage size={128} className="rounded-lg mx-auto" />
          </div>
          <ArtistInfo />
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
