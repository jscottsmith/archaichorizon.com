"use client";

import React from "react";
import Link from "next/link";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";
import { CoverImage } from "./CoverImage";
import { ArtistInfo } from "./ArtistInfo";

export const TrackInfo = React.memo(function TrackInfo({
  className,
}: {
  className?: string;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const linkClass =
    "flex items-center gap-2 hover:bg-accent/50 transition-colors rounded-md p-1.5";
  return (
    <div className={cn("flex items-center gap-2 -ml-1.5 -mt-1.5", className)}>
      {currentTrack?.catNo ? (
        <Link href={`/release/${currentTrack.catNo}`} className={linkClass}>
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
