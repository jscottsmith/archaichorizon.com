"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { usePlaylist } from "@/app/stores/playlistStore";
import { useRelease } from "@/app/hooks/useRelease";
import { useNormalizeTracks } from "@/app/hooks/useNormalizeTracks";
import { getAllCatNos } from "@/app/constants/releaseMap";

export function usePlaylistTracks() {
  const params = useParams();
  const playlistTracks = usePlaylist((state) => state.tracks);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const selectTrack = usePlaylist((state) => state.selectTrack);
  const setTracks = usePlaylist((state) => state.setTracks);

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

    return catNos[Math.abs(hash) % catNos.length];
  }, []);

  const catNo = params.catNo
    ? (params.catNo as string)
    : getDateBasedRandomCatNo;

  const release = useRelease(catNo);
  const tracks = useNormalizeTracks(release.data);

  useEffect(() => {
    if (playlistTracks.length === 0 && tracks.length > 0) {
      setTracks(tracks);
    }
  }, [tracks, playlistTracks.length, setTracks]);

  return {
    playlistTracks,
    currentTrackIndex,
    selectTrack,
  };
}
