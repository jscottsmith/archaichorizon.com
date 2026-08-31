"use client";

import Link from "next/link";
import { ArtistInfo } from "../MediaPlayer/ArtistInfo";
import { CoverArtCarousel } from "../CoverArtCarousel";
import { usePlaylist } from "@/app/stores/playlistStore";
import { buildReleaseRoute } from "@/app/utils/url";
import { cn } from "@/lib/utils";

export function NowPlayingDetails(props: { className?: string }) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  const images = currentTrack?.images?.cover
    ? [
        {
          url: currentTrack.images.cover,
          alt: `${currentTrack.title} cover art`,
        },
      ]
    : [];

  if (!currentTrack?.title && !currentTrack?.artist) {
    return (
      <div className={cn("text-xs text-muted-foreground", props.className)}>
        Nothing playing
      </div>
    );
  }

  const info = currentTrack?.catNo ? (
    <Link
      href={buildReleaseRoute(currentTrack.catNo)}
      className="block rounded-md p-1.5 transition-colors hover:bg-accent/50"
    >
      <ArtistInfo />
    </Link>
  ) : (
    <ArtistInfo />
  );

  return (
    <div className={cn("flex flex-col gap-3", props.className)}>
      {images.length > 0 && (
        <CoverArtCarousel className="mx-auto w-full max-w-40" images={images} />
      )}
      {info}
    </div>
  );
}
