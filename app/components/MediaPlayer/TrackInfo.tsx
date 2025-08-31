"use client";

import React from "react";
import Link from "next/link";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";
import { CoverImage } from "./CoverImage";
import { ArtistInfo } from "./ArtistInfo";
import { buildReleaseRoute } from "../../utils/url";

export const TrackInfo = React.memo(function TrackInfo({
  className,
}: {
  className?: string;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const linkClass =
    "flex items-center gap-2 hover:bg-accent/50 transition-colors rounded-md p-1.5 min-w-0 w-full";
  return (
    <div
      className={cn(
        "-ml-1.5 -mt-1.5 flex w-full min-w-0 items-center gap-2",
        className
      )}
    >
      {currentTrack?.catNo ? (
        <Link
          href={buildReleaseRoute(currentTrack.catNo)}
          className={linkClass}
        >
          <CoverImage />
          <ArtistInfo />
        </Link>
      ) : (
        <div className={linkClass}>
          <CoverImage />
          <ArtistInfo />
        </div>
      )}
    </div>
  );
});
