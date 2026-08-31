"use client";

import { X } from "lucide-react";
import { TrackList } from "./TrackList";
import { usePlaylist } from "../stores/playlistStore";
import { useRelease } from "../hooks/useRelease";
import { getAllCatNos } from "../constants/releaseMap";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { PanelContent } from "./PanelContent";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlaylistPanel() {
  const params = useParams();

  const getDateBasedRandomCatNo = useMemo(() => {
    const catNos = getAllCatNos();
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;

    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    const index = Math.abs(hash) % catNos.length;
    return catNos[index];
  }, []);

  const catNo = params.catNo
    ? (params.catNo as string)
    : getDateBasedRandomCatNo;

  const release = useRelease(catNo);
  const tracks = useNormalizeTracks(release.data);

  const playlistTracks = usePlaylist((state) => state.tracks);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const setTracks = usePlaylist((state) => state.setTracks);
  const selectTrack = usePlaylist((state) => state.selectTrack);
  const togglePlaylist = usePlaylist((state) => state.togglePlaylist);

  useEffect(() => {
    if (playlistTracks.length === 0) {
      setTracks(tracks);
    }
  }, [tracks, playlistTracks.length, setTracks]);

  return (
    <PanelContent>
      <div className="mb-4 flex items-start justify-between gap-2">
        <h1 className="text-2xl font-bold">Playlist</h1>
        <button
          type="button"
          aria-label="Close playlist"
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          onClick={togglePlaylist}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <TrackList
        tracks={playlistTracks}
        currentTrackIndex={currentTrackIndex}
        selectTrack={selectTrack}
      />
    </PanelContent>
  );
}
