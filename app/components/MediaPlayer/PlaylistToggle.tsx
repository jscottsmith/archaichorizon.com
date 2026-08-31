"use client";

import React from "react";
import { usePlaylist } from "../../stores/playlistStore";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

export const PlaylistToggle = React.memo(function PlaylistToggle({
  className,
}: {
  className?: string;
}) {
  const isPlaylistPanelOpen = usePlaylist((state) => state.isPlaylistPanelOpen);
  const togglePlaylistPanel = usePlaylist((state) => state.togglePlaylistPanel);

  return (
    <Button
      variant={isPlaylistPanelOpen ? "default" : "ghost"}
      size="icon"
      onClick={togglePlaylistPanel}
      className={cn("h-8 w-8", className)}
      aria-label={isPlaylistPanelOpen ? "Hide playlist" : "Show playlist"}
    >
      <List size={16} />
    </Button>
  );
});
