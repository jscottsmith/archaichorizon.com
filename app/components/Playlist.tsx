"use client";

import { TrackList } from "./TrackList";
import { usePlaylist } from "../stores/playlistStore";
import { useRelease } from "../hooks/useRelease";
import { getAllCatNos } from "../constants/releaseMap";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useHandleClickOutside } from "../hooks/useHandleClickOutside";

export function Playlist(props: { className?: string }) {
  const params = useParams();

  // Get a date-based random catalog number for consistent server/client rendering
  const getDateBasedRandomCatNo = useMemo(() => {
    const catNos = getAllCatNos();
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;

    // Create a simple hash from the date string using djb2 algorithm
    let hash = 0; // Initialize hash value to 0
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i); // Get ASCII code of current character
      hash = (hash << 5) - hash + char; // djb2 formula: hash * 33 + char
      hash = hash & hash; // Bitwise AND to ensure 32-bit integer (handles overflow)
    }

    // Use the hash to select a catalog number
    const index = Math.abs(hash) % catNos.length;
    return catNos[index];
  }, []);

  // Get catNo from params if this is a release page
  // Otherwise, use the date-based random catNo
  const catNo = params.catNo
    ? (params.catNo as string)
    : getDateBasedRandomCatNo;

  // Pre-fetch data on the server
  const release = useRelease(catNo);

  // Process metadata and create normalized track list
  const tracks = useNormalizeTracks(release.data);

  // Use inline state selectors for each piece of state
  const playlistTracks = usePlaylist((state) => state.tracks);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const isPlaylistVisible = usePlaylist((state) => state.isPlaylistVisible);
  const togglePlaylist = usePlaylist((state) => state.togglePlaylist);
  const setTracks = usePlaylist((state) => state.setTracks);
  const selectTrack = usePlaylist((state) => state.selectTrack);

  const playlistRef = useHandleClickOutside({
    enabled: isPlaylistVisible,
    onOutsideClick: togglePlaylist,
  });

  // Set tracks when the release is fetched
  // but only if the playlist is empty
  useEffect(() => {
    if (playlistTracks.length === 0) {
      setTracks(tracks);
    }
  }, [tracks, playlistTracks.length, setTracks]);

  // Don't render if playlist is not visible
  if (!isPlaylistVisible) {
    return null;
  }

  return (
    <div ref={playlistRef} className={props.className}>
      <Card className="max-h-[calc(100vh-12rem)] overflow-y-auto py-2">
        <CardContent className="px-2">
          <TrackList
            tracks={playlistTracks}
            currentTrackIndex={currentTrackIndex}
            selectTrack={selectTrack}
          />
        </CardContent>
      </Card>
    </div>
  );
}
