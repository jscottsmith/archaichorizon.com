"use client";

import React from "react";
import { usePlaylist } from "../../stores/playlistStore";
import { Button } from "../ui/button";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

export const PlaylistToggle = React.memo(function PlaylistToggle({
  className,
}: {
  className?: string;
}) {
  const isPlaylistVisible = usePlaylist((state) => state.isPlaylistVisible);
  const togglePlaylist = usePlaylist((state) => state.togglePlaylist);

  return (
    <Button
      variant={isPlaylistVisible ? "default" : "ghost"}
      size="icon"
      onClick={togglePlaylist}
      className={cn("h-8 w-8", className)}
      aria-label={isPlaylistVisible ? "Hide playlist" : "Show playlist"}
    >
      <List size={16} />
    </Button>
  );
});
