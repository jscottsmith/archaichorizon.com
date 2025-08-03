import { formatTrackLength } from "@/app/utils/tracks";
import { usePlaylist } from "../contexts/PlaylistProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface TrackListProps {
  className?: string;
}

export function TrackList(props: TrackListProps) {
  const { tracks, currentTrackIndex, selectTrack } = usePlaylist();

  // Use props if provided, otherwise use context
  const displayTracks = tracks;
  const displayCurrentTrackIndex = currentTrackIndex;
  const handleTrackSelect = selectTrack;

  if (displayTracks.length === 0) {
    return null;
  }

  return (
    <Card className={cn("py-2", props.className)}>
      <CardContent className="px-2 space-y-2">
        {displayTracks.map((track, index) => (
          <Button
            key={index}
            variant={index === displayCurrentTrackIndex ? "default" : "ghost"}
            onClick={() => handleTrackSelect(index)}
            className={cn("w-full justify-start h-auto p-1.5 group")}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Play
                    fill="currentColor"
                    className={cn(
                      "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity",
                      index === displayCurrentTrackIndex && "opacity-100"
                    )}
                  />
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-mono text-xs justify-center absolute group-hover:opacity-0 transition-opacity",
                      index === displayCurrentTrackIndex && "opacity-0"
                    )}
                  >
                    {track.track}
                  </Badge>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-sm">{track.title}</div>
                  {track.artist && (
                    <div className="text-xs">{track.artist}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                {track.album && (
                  <span className="hidden sm:inline">{track.album}</span>
                )}
                {track.length && (
                  <span className="font-mono">
                    {formatTrackLength(track.length)}
                  </span>
                )}
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
