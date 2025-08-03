"use client";

import { usePlaylist } from "../contexts/PlaylistProvider";
import Image from "next/image";

export function Background() {
  const { currentTrack } = usePlaylist();

  // If no current track or no cover image, don't render anything
  if (!currentTrack?.images?.cover) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-3xl" />
      <Image
        src={currentTrack.images.cover}
        alt={`${currentTrack.title} cover art`}
        width={16}
        height={16}
        className="max-w-none w-full h-full object-cover"
        priority
      />
    </div>
  );
}
