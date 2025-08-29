"use client";

import React from "react";
import Image from "next/image";
import { usePlaylist } from "../../stores/playlistStore";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

export const CoverImage = React.memo(function CoverImage({
  className,
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  return (
    // width/height must be set to match the size prop
    <div className={cn("h-16 w-16 flex-shrink-0", className)}>
      {currentTrack?.images?.thumbnail || currentTrack?.images?.cover ? (
        <Image
          priority
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
            "bg-muted flex aspect-square w-full flex-shrink-0 items-center justify-center rounded-sm"
          )}
        >
          <span className="text-muted-foreground text-center text-xs">
            <ImageOff size={16} />
          </span>
        </div>
      )}
    </div>
  );
});
