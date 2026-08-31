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

export function PlayerBar(props: { className?: string }) {
  return (
    <div
      id={ids.mediaPlayer}
      className={cn(
        "hidden shrink-0 space-y-3 border-t panel-surface px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:block",
        props.className
      )}
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
    </div>
  );
}
