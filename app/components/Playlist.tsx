"use client";

import { TrackList } from "./TrackList";
import { usePlaylist } from "../stores/playlistStore";
import { useRelease } from "../hooks/useRelease";
import { getAllCatNos } from "../constants/releaseMap";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useHandleClickOutside } from "../hooks/useHandleClickOutside";

export function Playlist(props: { className?: string }) {
  const params = useParams();

  // Get catNo from params if this is a release page
  // Otherwise, use the first catNo from the release map
  const catNo = params.catNo ? (params.catNo as string) : getAllCatNos()[0];

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
      <Card className="py-2">
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
