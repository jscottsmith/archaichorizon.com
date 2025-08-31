import React from "react";
import { formatTrackLength } from "@/app/utils/tracks";
import type { Track as TrackType } from "@/app/utils/tracks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Play, AudioLines } from "lucide-react";
import { TrackDownload } from "./TrackDownload";

interface TrackProps {
  track: TrackType & { originalIndex: number };
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onSelect: (index: number) => void;
  showAlbumName?: boolean;
}

export const Track = React.memo(function Track({
  track,
  isCurrentTrack,
  isPlaying,
  onSelect,
  showAlbumName = false,
}: TrackProps) {
  return (
    <Button
      variant={isCurrentTrack ? "default" : "ghost"}
      onClick={() => onSelect(track.originalIndex)}
      className={cn("group h-auto w-full justify-start px-2")}
      asChild
    >
      <div className="flex w-full min-w-0 items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center space-x-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
            {isPlaying ? (
              <AudioLines
                fill="currentColor"
                className="h-4 w-4 animate-pulse"
              />
            ) : (
              <Play
                fill="currentColor"
                className={cn(
                  "h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100",
                  isCurrentTrack && "opacity-100"
                )}
              />
            )}
            <Badge
              variant="outline"
              className={cn(
                "absolute justify-center font-mono text-xs transition-opacity group-hover:opacity-0",
                (isCurrentTrack || isPlaying) && "opacity-0"
              )}
            >
              {track.track}
            </Badge>
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-sm font-bold">{track.title}</div>
            {track.artist && (
              <div className="truncate text-xs">{track.artist}</div>
            )}
          </div>
        </div>
        <div className="ml-2 flex flex-shrink-0 items-center space-x-4 text-xs">
          {/* Only show album name if we have multiple albums */}
          {track.album && showAlbumName && (
            <span className="hidden sm:inline">{track.album}</span>
          )}
          {track.length && (
            <span className="font-mono">{formatTrackLength(track.length)}</span>
          )}
          <TrackDownload track={track} />
        </div>
      </div>
    </Button>
  );
});
