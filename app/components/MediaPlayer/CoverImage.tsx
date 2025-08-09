"use client";

import React from "react";
import Image from "next/image";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";

export const CoverImage = React.memo(function CoverImage({
  className,
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  return (
    <div className={cn("flex-shrink-0", className)}>
      {currentTrack?.images?.thumbnail || currentTrack?.images?.cover ? (
        <Image
          src={currentTrack!.images.thumbnail || currentTrack!.images.cover!}
          alt={`${currentTrack!.title || "Track"} cover art`}
          width={size}
          height={size}
          className="rounded-sm object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div
          className={cn(
            "flex-shrink-0 w-full aspect-square bg-muted rounded-md flex items-center justify-center",
            className
          )}
        >
          <span className="text-muted-foreground text-xs">No Image</span>
        </div>
      )}
    </div>
  );
});
