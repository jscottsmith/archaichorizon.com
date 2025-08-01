"use client";

import { MediaPlayer } from "./MediaPlayer";
import { TrackList } from "./TrackList";
import { usePlaylist } from "../contexts/PlaylistProvider";
import { useRelease } from "../hooks/useRelease";
import { getAllCatNos } from "../constants/releaseMap";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export function Playlist() {
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

  return (
    <div className="w-full">
      <MediaPlayer
        title={playlist.currentTrack?.title}
        artist={playlist.currentTrack?.artist}
        src={playlist.currentTrack?.url || ""}
        isPlaying={playlist.isPlaying}
      />
      <TrackList />
    </div>
  );
}
