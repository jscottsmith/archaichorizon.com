"use client";

import React from "react";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";

export const ArtistInfo = React.memo(function ArtistInfo({
  className,
  hideArtist = false,
  hideAlbum = false,
  hideTrackNumbers = false,
}: {
  className?: string;
  hideArtist?: boolean;
  hideAlbum?: boolean;
  hideTrackNumbers?: boolean;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);

  if (!currentTrack?.title && !currentTrack?.artist) {
    return null;
  }

  return (
    <div
      className={cn(
        "min-w-0 flex-1 overflow-hidden text-left text-xs",
        className
      )}
    >
      {currentTrack?.title && (
        <h3 className="flex min-w-0 items-center gap-2 overflow-hidden text-sm font-semibold">
          <span className="min-w-0 truncate">{currentTrack.title}</span>
          {!hideTrackNumbers && (
            <span className="text-muted-foreground flex-shrink-0 text-xs">
              {currentTrackIndex + 1} of {totalTracks}
            </span>
          )}
        </h3>
      )}
      {currentTrack?.artist && !hideArtist && (
        <p className="text-muted-foreground min-w-0 truncate">
          {currentTrack.artist}
        </p>
      )}
      {currentTrack?.album && !hideAlbum && (
        <p className="text-muted-foreground min-w-0 truncate">
          {currentTrack.album}
        </p>
      )}
    </div>
  );
});
