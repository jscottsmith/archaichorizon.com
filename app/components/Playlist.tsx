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

  const playlist = usePlaylist();

  const playlistRef = useHandleClickOutside({
    enabled: playlist.isPlaylistVisible,
    onOutsideClick: playlist.togglePlaylist,
  });

  // Set tracks when the release is fetched
  // but only if the playlist is empty
  useEffect(() => {
    if (playlist.tracks.length === 0) {
      playlist.setTracks(tracks);
    }
  }, [tracks, playlist]);

  // Don't render if playlist is not visible
  if (!playlist.isPlaylistVisible) {
    return null;
  }

  return (
    <div ref={playlistRef} className={props.className}>
      <Card className="py-2">
        <CardContent className="px-2">
          <TrackList
            tracks={playlist.tracks}
            currentTrackIndex={playlist.currentTrackIndex}
            selectTrack={playlist.selectTrack}
          />
        </CardContent>
      </Card>
    </div>
  );
}
