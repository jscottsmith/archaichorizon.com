"use client";

import React from "react";
import Image from "next/image";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";

export const CoverImage = React.memo(function CoverImage({
  className,
}: {
  className?: string;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  if (!currentTrack?.images?.thumbnail && !currentTrack?.images?.cover) {
    return (
      <div
        className={cn(
          "flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center",
          className
        )}
      >
        <span className="text-muted-foreground text-xs">No Image</span>
      </div>
    );
  }

  return (
    <div className={cn("flex-shrink-0", className)}>
      <Image
        src={currentTrack!.images.thumbnail || currentTrack!.images.cover!}
        alt={`${currentTrack!.title || "Track"} cover art`}
        width={64}
        height={64}
        className="rounded-sm object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
});
