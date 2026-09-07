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
import { panelSurface, shellFreePl } from "./shell-classes";

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
  const [open, setOpen] = useState(panelVisible);
  const [prevPanelVisible, setPrevPanelVisible] = useState(panelVisible);

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

  if (!panelVisible) {
    return null;
  }

  const panelContent = isPlaylistPanelOpen ? <PlaylistPanel /> : props.children;

  if (!showMobileDrawer) {
    return (
      <div className={cn(panelSurface, "absolute inset-0 z-10 flex flex-col")}>
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pr-4 pb-[calc(var(--spacing-shell-inset)+8rem)]",
            shellFreePl
          )}
        >
          {panelContent}
        </div>
      </div>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      showSwipeHandle
      modal={false}
    >
      <DrawerContent className="[--drawer-content-height:90vh]">
        {panelContent}
      </DrawerContent>
    </Drawer>
  );
}
