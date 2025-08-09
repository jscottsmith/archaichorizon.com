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
    <div className={cn("flex-1 text-left min-w-0", className)}>
      {currentTrack?.title && (
        <h3 className="font-semibold text-sm flex whitespace-nowrap gap-2 items-center min-w-0">
          <span className="truncate">{currentTrack.title}</span>
          {!hideTrackNumbers && (
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {currentTrackIndex + 1} of {totalTracks}
            </span>
          )}
        </h3>
      )}
      {currentTrack?.artist && !hideArtist && (
        <p className="text-sm text-muted-foreground truncate">
          {currentTrack.artist}
        </p>
      )}
      {currentTrack?.album && !hideAlbum && (
        <p className="text-xs text-muted-foreground truncate">
          {currentTrack.album}
        </p>
      )}
    </div>
  );
});
