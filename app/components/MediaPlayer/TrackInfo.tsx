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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {currentTrack?.catNo ? (
        <Link
          href={`/release/${currentTrack.catNo}`}
          className="flex items-center gap-2 hover:bg-accent/50 transition-colors rounded-md p-1.5"
        >
          <CoverImage />
          <ArtistInfo />
        </Link>
      ) : (
        <>
          <CoverImage />
          <ArtistInfo />
        </>
      )}
    </div>
  );
});
