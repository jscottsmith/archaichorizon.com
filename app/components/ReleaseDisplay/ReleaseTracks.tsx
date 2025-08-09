"use client";

import { Separator } from "@/components/ui/separator";
import { TrackList } from "../TrackList";
import { usePlaylist } from "../../stores/playlistStore";
import type { Track } from "../../utils/tracks";

interface ReleaseTracksProps {
  tracks: Track[];
  catNo: string;
}

export function ReleaseTracks({ tracks, catNo }: ReleaseTracksProps) {
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const selectTrack = usePlaylist((state) => state.selectTrack);
  const setTracks = usePlaylist((state) => state.setTracks);
  const currentTrack = usePlaylist((state) => state.currentTrack);

  const isCurrentPlaylist = catNo === currentTrack?.catNo?.toLowerCase();

  return (
    <div className="space-y-4">
      <Separator />
      <div>
        <h3 className="font-semibold mb-2">Tracks</h3>
        <TrackList
          tracks={tracks}
          currentTrackIndex={isCurrentPlaylist ? currentTrackIndex : undefined}
          selectTrack={
            isCurrentPlaylist
              ? selectTrack
              : (index) => {
                  setTracks(tracks, index);
                }
          }
        />
      </div>
    </div>
  );
}
