"use client";

import { TrackList } from "./TrackList";
import { usePlaylist } from "../stores/playlistStore";
import { ContentWrapper } from "./ContentWrapper";
import { PanelHeader } from "./PanelHeader";

export function PlaylistPanel() {
  const closePlaylistPanel = usePlaylist((state) => state.closePlaylistPanel);
  const playlistTracks = usePlaylist((state) => state.tracks);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const selectTrack = usePlaylist((state) => state.selectTrack);

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
