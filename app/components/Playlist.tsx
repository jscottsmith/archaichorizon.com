"use client";

import { TrackList } from "./TrackList";
import { usePlaylist } from "../contexts/PlaylistProvider";
import { useRelease } from "../hooks/useRelease";
import { getAllCatNos } from "../constants/releaseMap";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { useEffect } from "react";
import { useParams } from "next/navigation";

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
    <div className={props.className}>
      <TrackList />
    </div>
  );
}
