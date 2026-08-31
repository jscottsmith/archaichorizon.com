"use client";

import { TrackList } from "./TrackList";
import { usePlaylist } from "../stores/playlistStore";
import { usePlaylistTracks } from "@/app/hooks/usePlaylistTracks";
import { ContentWrapper } from "./ContentWrapper";
import { PanelHeader } from "./PanelHeader";

export function PlaylistPanel() {
  const closePlaylistPanel = usePlaylist((state) => state.closePlaylistPanel);
  const { playlistTracks, currentTrackIndex, selectTrack } = usePlaylistTracks();

  return (
    <ContentWrapper>
      <PanelHeader
        title="Playlist"
        onClose={closePlaylistPanel}
        closeLabel="Close playlist"
      />
      <TrackList
        tracks={playlistTracks}
        currentTrackIndex={currentTrackIndex}
        selectTrack={selectTrack}
      />
    </ContentWrapper>
  );
}
