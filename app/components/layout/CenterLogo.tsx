"use client";

import { usePathname } from "next/navigation";
import { Logotype } from "../Logo";
import { usePlaylist } from "@/app/stores/playlistStore";
import { showContentPanel } from "./layout-utils";
import { shellFreeMdPl } from "./shell-classes";
import { cn } from "@/lib/utils";

export function CenterLogo() {
  const pathname = usePathname();
  const isPlaylistPanelOpen = usePlaylist((state) => state.isPlaylistPanelOpen);

  if (showContentPanel(pathname, isPlaylistPanelOpen)) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center md:pr-shell-inset",
        shellFreeMdPl
      )}
    >
      <Logotype className="w-64 max-w-[70vw]" />
    </div>
  );
}
