"use client";

import { usePathname } from "next/navigation";
import { Logotype } from "../Logo";
import { usePlaylist } from "@/app/stores/playlistStore";
import { showContentPanel } from "./layout-utils";

export function CenterLogo() {
  const pathname = usePathname();
  const isPlaylistPanelOpen = usePlaylist((state) => state.isPlaylistPanelOpen);

  if (showContentPanel(pathname, isPlaylistPanelOpen)) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <Logotype className="w-64 max-w-[70vw]" />
    </div>
  );
}
