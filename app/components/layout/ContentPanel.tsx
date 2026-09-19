"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery, useIsClient } from "usehooks-ts";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";
import { usePlaylist } from "@/app/stores/playlistStore";
import { PlaylistPanel } from "../PlaylistPanel";
import { isContentRoute, showContentPanel } from "./layout-utils";
import { shellFreePl } from "./shell-classes";

const CLOSE_ANIMATION_MS = 450;

export function ContentPanel(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isClient = useIsClient();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    defaultValue: true,
  });
  const showMobileDrawer = isClient && !isDesktop;
  const isPlaylistPanelOpen = usePlaylist((state) => state.isPlaylistPanelOpen);
  const closePlaylistPanel = usePlaylist((state) => state.closePlaylistPanel);
  const panelVisible = showContentPanel(pathname, isPlaylistPanelOpen);
  // Start closed so the drawer can mount before opening and play enter animations.
  const [open, setOpen] = useState(false);
  const [prevPanelVisible, setPrevPanelVisible] = useState(false);

  if (prevPanelVisible !== panelVisible) {
    setPrevPanelVisible(panelVisible);
    setOpen(panelVisible);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      if (isPlaylistPanelOpen) {
        closePlaylistPanel();

        if (isContentRoute(pathname)) {
          setOpen(true);
          return;
        }

        setOpen(false);
        return;
      }

      if (isContentRoute(pathname)) {
        setOpen(false);
        window.setTimeout(() => {
          router.push(ROUTES.HOME);
        }, CLOSE_ANIMATION_MS);
        return;
      }
    }

    setOpen(nextOpen);
  }

  const panelContent = isPlaylistPanelOpen ? <PlaylistPanel /> : props.children;

  if (!showMobileDrawer) {
    if (!panelVisible) {
      return null;
    }

    return (
      <div className="absolute inset-0 z-10 flex flex-col">
        <div className={cn("flex min-h-0 flex-1 flex-col", shellFreePl)}>
          {panelContent}
        </div>
      </div>
    );
  }

  // Keep the drawer mounted while closed so open/close can animate like nav/player.
  return (
    <Drawer open={open} onOpenChange={handleOpenChange} showSwipeHandle>
      <DrawerContent>{panelContent}</DrawerContent>
    </Drawer>
  );
}
