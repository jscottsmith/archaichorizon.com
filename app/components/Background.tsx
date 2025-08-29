"use client";

import { usePlaylist } from "../stores/playlistStore";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Background() {
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-background/50 absolute inset-0 z-10 saturate-200 backdrop-blur-3xl" />
      {currentTrack?.images?.cover && (
        <Image
          src={currentTrack.images.cover}
          alt={`${currentTrack.title} cover art`}
          width={16}
          height={16}
          className={cn(
            "h-full w-full max-w-none object-cover transition-opacity duration-1000 ease-in-out",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          priority
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
}
