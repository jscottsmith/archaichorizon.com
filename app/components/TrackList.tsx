import type { Track } from "@/app/utils/tracks";
import { cn } from "@/lib/utils";
import { useAudio } from "@/app/stores/audioStore";
import { Track as TrackComponent } from "./Track";
import { useMemo } from "react";

interface TrackListProps {
  className?: string;
  tracks: Track[];
  currentTrackIndex?: number;
  selectTrack: (index: number) => void;
}

function reduceTracksByAlbum(tracks: Track[]) {
  return tracks.reduce(
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
}

export function TrackList({
  tracks,
  currentTrackIndex,
  selectTrack,
  className,
}: TrackListProps) {
  const audioIsPlaying = useAudio((state) => state.isPlaying);
  // Group tracks by album
  const tracksByAlbum = useMemo(() => reduceTracksByAlbum(tracks), [tracks]);

  if (tracks.length === 0) {
    return null;
  }

  // Check if we have multiple albums
  const albumNames = Object.keys(tracksByAlbum);
  const hasMultipleAlbums = albumNames.length > 1;

  return (
    <div className={cn("space-y-2", className)}>
      {albumNames.map((albumName, i) => {
        const albumTracks = tracksByAlbum[albumName];

        return (
          <div key={albumName} className="space-y-2">
            {/* Album header - only show if multiple albums */}
            {hasMultipleAlbums && (
              <div className="px-2 py-1">
                <h3 className="text-muted-foreground text-sm font-semibold">
                  {albumName}
                </h3>
              </div>
            )}

            {/* Tracks for this album */}
            {albumTracks.map((track, j) => {
              const isCurrentTrack = track.originalIndex === currentTrackIndex;
              const isPlaying = isCurrentTrack && audioIsPlaying;

              return (
                <TrackComponent
                  key={`${i}-${j}`}
                  track={track}
                  isCurrentTrack={isCurrentTrack}
                  isPlaying={isPlaying}
                  onSelect={selectTrack}
                  showAlbumName={hasMultipleAlbums}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
