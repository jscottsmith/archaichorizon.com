"use client";

import React from "react";
import { TrackInfo } from "./TrackInfo";
import { MainControls } from "./MainControls";
import { VolumeControl } from "./VolumeControl";
import { PlaylistToggle } from "./PlaylistToggle";

export const MediaPlayerControls = React.memo(function MediaPlayerControls() {
  return (
    <div className="grid grid-cols-12 items-center justify-between">
      <TrackInfo className="col-span-5" />

      <MainControls className="col-span-2 justify-center" />

      <div className="col-span-5 flex items-center justify-end gap-2">
        <VolumeControl />
        <PlaylistToggle />
      </div>
    </div>
  );
});
