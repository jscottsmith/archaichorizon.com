"use client";

import React from "react";
import Link from "next/link";
import { usePlaylist, selectCurrentTrack } from "../../stores/playlistStore";
import { buildReleaseRoute } from "@/app/utils/url";
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
  asLink = true,
  onClick,
  children,
}: {
  className?: string;
  hideArtist?: boolean;
  hideAlbum?: boolean;
  hideTrackNumbers?: boolean;
  asLink?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const currentTrack = usePlaylist(selectCurrentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);

  const hasTrack = Boolean(currentTrack?.title || currentTrack?.artist);

  if (!hasTrack && !children) {
    return null;
  }

  const details = hasTrack ? (
    <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left text-xs">
      {currentTrack?.title && (
        <h3 className="flex min-w-0 items-center gap-2 overflow-hidden text-sm font-semibold">
          <span className="min-w-0 truncate">
            <AudioTrackTitle enableId>{currentTrack.title}</AudioTrackTitle>
          </span>
          {!hideTrackNumbers && (
            <span className="shrink-0 text-xs text-muted-foreground">
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
        <p className="truncate text-muted-foreground">
          <AudioTrackArtist enableId>{currentTrack.artist}</AudioTrackArtist>
        </p>
      )}
      {currentTrack?.album && !hideAlbum && (
        <p className="truncate text-muted-foreground">
          <AudioTrackAlbum enableId>{currentTrack.album}</AudioTrackAlbum>
        </p>
      )}
    </div>
  ) : null;

  const content = (
    <>
      {children}
      {details}
    </>
  );

  const href =
    asLink && currentTrack?.catNo
      ? buildReleaseRoute(currentTrack.catNo)
      : undefined;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cn("min-w-0", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("min-w-0", className)}>{content}</div>;
});
