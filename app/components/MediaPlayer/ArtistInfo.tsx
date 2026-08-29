"use client";

import React from "react";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";
import {
  AudioTrackTitle,
  AudioTrackArtist,
  AudioTrackAlbum,
  AudioTrackCurrentTrackNumber,
  AudioTrackTotalsTracks,
} from "./LabeledElements";

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
          <AudioTrackTitle enableId>{currentTrack.title}</AudioTrackTitle>
          {!hideTrackNumbers && (
            <span className="flex-shrink-0 text-xs text-muted-foreground">
              <AudioTrackCurrentTrackNumber enableId>
                {currentTrackIndex + 1}
              </AudioTrackCurrentTrackNumber>{" "}
              of{" "}
              <AudioTrackTotalsTracks enableId>
                {totalTracks}
              </AudioTrackTotalsTracks>
            </span>
          )}
        </h3>
      )}
      {currentTrack?.artist && !hideArtist && (
        <p className="min-w-0 truncate text-muted-foreground">
          <AudioTrackArtist enableId>{currentTrack.artist}</AudioTrackArtist>
        </p>
      )}
      {currentTrack?.album && !hideAlbum && (
        <p className="min-w-0 truncate text-muted-foreground">
          <AudioTrackAlbum enableId>{currentTrack.album}</AudioTrackAlbum>
        </p>
      )}
    </div>
  );
});
