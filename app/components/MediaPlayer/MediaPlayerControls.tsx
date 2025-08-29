"use client";

import React from "react";
import { TrackInfo } from "./TrackInfo";
import { MainControls } from "./MainControls";
import { VolumeControl } from "./VolumeControl";
import { PlaylistToggle } from "./PlaylistToggle";

export const MediaPlayerControls = React.memo(function MediaPlayerControls() {
  return (
    <div className="grid grid-cols-2 items-center justify-between sm:grid-cols-3">
      <TrackInfo className="col-span-1" />

      <MainControls className="col-span-1 justify-end sm:justify-center" />

      <div className="col-span-3 flex items-center justify-between gap-2 sm:col-span-1 sm:justify-end">
        <VolumeControl />
        <PlaylistToggle />
      </div>
    </div>
  );
});
