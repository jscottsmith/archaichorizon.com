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
  const audioIsPlaying = useAudio((state) => state.isPlaying);

  if (tracks.length === 0) {
    return null;
  }

  // Group tracks by album
  const tracksByAlbum = tracks.reduce(
    (acc, track, index) => {
      const albumName = track.album;

      if (!albumName) {
        return acc;
      }

      if (!acc[albumName]) {
        acc[albumName] = [];
      }
      acc[albumName].push({ ...track, originalIndex: index });
      return acc;
    },
    {} as Record<string, (Track & { originalIndex: number })[]>
  );

  // Check if we have multiple albums
  const albumNames = Object.keys(tracksByAlbum);

  return (
    <div className={cn("space-y-2", className)}>
      {albumNames.map((albumName) => {
        const albumTracks = tracksByAlbum[albumName];

        return (
          <div key={albumName} className="space-y-2">
            {/* Album header - only show if multiple albums */}

            <div className="px-2 py-1">
              <h3 className="text-muted-foreground text-sm font-semibold">
                {albumName}
              </h3>
            </div>

            {/* Tracks for this album */}
            {albumTracks.map((track) => {
              const isCurrentTrack = track.originalIndex === currentTrackIndex;
              const isPlaying = isCurrentTrack && audioIsPlaying;

              return (
                <Button
                  key={track.originalIndex}
                  variant={isCurrentTrack ? "default" : "ghost"}
                  onClick={() => selectTrack(track.originalIndex)}
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
                        <div className="truncate text-sm font-bold">
                          {track.title}
                        </div>
                        {track.artist && (
                          <div className="truncate text-xs">{track.artist}</div>
                        )}
                      </div>
                    </div>
                    <div className="ml-2 flex flex-shrink-0 items-center space-x-4 text-xs">
                      {/* Only show album name if we have multiple albums */}
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
      })}
    </div>
  );
}
