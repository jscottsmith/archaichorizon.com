"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrackInfo } from "./TrackInfo";
import { MainControls } from "./MainControls";
import { VolumeControl } from "./VolumeControl";
import { PlaylistToggle } from "./PlaylistToggle";

export const MediaPlayerControls = React.memo(function MediaPlayerControls() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-between">
      <TrackInfo className="col-span-1" />

      <MainControls className="col-span-1 justify-end sm:justify-center" />

      <div className="col-span-3 sm:col-span-1 flex items-center justify-between sm:justify-end gap-2">
        <VolumeControl />
        <PlaylistToggle />
      </div>
    </div>
  );
});
