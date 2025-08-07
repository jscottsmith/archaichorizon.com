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
      <div className="absolute z-10 inset-0 backdrop-blur-3xl bg-background/50 saturate-200" />
      {currentTrack?.images?.cover && (
        <Image
          src={currentTrack.images.cover}
          alt={`${currentTrack.title} cover art`}
          width={16}
          height={16}
          className={cn(
            "max-w-none w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          priority
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
}
