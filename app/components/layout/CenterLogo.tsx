"use client";

import { usePathname } from "next/navigation";
import { Logotype } from "../Logo";
import { usePlaylist } from "@/app/stores/playlistStore";
import { showRightPanel } from "./layout-utils";

export function CenterLogo() {
  const pathname = usePathname();
  const isPlaylistVisible = usePlaylist((state) => state.isPlaylistVisible);

  if (showRightPanel(pathname, isPlaylistVisible)) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <Logotype className="w-64 max-w-[70vw]" />
    </div>
  );
}
