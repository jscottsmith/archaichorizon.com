import { formatTrackLength } from "@/app/utils/tracks";
import type { Track } from "@/app/utils/tracks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Play, AudioLines } from "lucide-react";
import { TrackDownload } from "./TrackDownload";
import { useAudio } from "@/app/stores/audioStore";

interface TrackListProps {
  className?: string;
  tracks: Track[];
  currentTrackIndex?: number;
  selectTrack: (index: number) => void;
}

export function TrackList({
  tracks,
  currentTrackIndex,
  selectTrack,
  className,
}: TrackListProps) {
  const audio = useAudio();

  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {tracks.map((track, index) => {
        const isCurrentTrack = index === currentTrackIndex;
        const isPlaying = isCurrentTrack && audio.isPlaying;

        return (
          <Button
            key={index}
            variant={isCurrentTrack ? "default" : "ghost"}
            onClick={() => selectTrack(index)}
            className={cn("w-full justify-start h-auto px-2 group")}
            asChild
          >
            <div className="flex items-center justify-between w-full min-w-0">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {isPlaying ? (
                    <AudioLines
                      fill="currentColor"
                      className="w-4 h-4 animate-pulse"
                    />
                  ) : (
                    <Play
                      fill="currentColor"
                      className={cn(
                        "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity",
                        isCurrentTrack && "opacity-100"
                      )}
                    />
                  )}
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-mono text-xs justify-center absolute group-hover:opacity-0 transition-opacity",
                      (isCurrentTrack || isPlaying) && "opacity-0"
                    )}
                  >
                    {track.track}
                  </Badge>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-bold text-sm truncate">
                    {track.title}
                  </div>
                  {track.artist && (
                    <div className="text-xs truncate">{track.artist}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs flex-shrink-0 ml-2">
                {track.album && (
                  <span className="hidden sm:inline">{track.album}</span>
                )}
                {track.length && (
                  <span className="font-mono">
                    {formatTrackLength(track.length)}
                  </span>
                )}
                <TrackDownload track={track} />
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
