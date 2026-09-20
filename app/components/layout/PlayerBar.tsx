"use client";

import { cn } from "@/lib/utils";
import { ids } from "@/app/constants/ids";
import {
  CoverImage,
  MainControls,
  VolumeControl,
  PlaylistToggle,
  TrackProgress,
} from "../MediaPlayer";
import { Card } from "@/components/ui/card";
import { shellFreeLeft } from "./shell-classes";

export function PlayerBar(props: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed z-30 hidden md:block",
        "right-shell-inset bottom-[calc(var(--spacing-shell-inset)+env(safe-area-inset-bottom,0px))]",
        shellFreeLeft,
        props.className
      )}
    >
      <Card
        id={ids.mediaPlayer}
        className="pointer-events-auto mx-auto w-full max-w-4xl gap-3 px-4 py-3"
      >
        <div className="grid grid-cols-12 items-center justify-between">
          <div className="col-span-5 flex items-center">
            <CoverImage />
          </div>

          <MainControls className="col-span-2 justify-center" />

          <div className="col-span-5 flex items-center justify-end gap-2">
            <VolumeControl />
            <PlaylistToggle />
          </div>
        </div>
        <TrackProgress />
      </Card>
    </div>
  );
}
