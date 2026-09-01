"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useMediaQuery, useIsClient } from "usehooks-ts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";
import { usePlaylist } from "@/app/stores/playlistStore";
import { PlaylistPanel } from "../PlaylistPanel";
import {
  getPanelTitle,
  isContentRoute,
  showContentPanel,
} from "./layout-utils";

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

  useEffect(() => {
    setOpen(panelVisible);
  }, [panelVisible]);

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
      <div className="panel-surface absolute inset-0 z-10 flex flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4">
          {panelContent}
        </div>
      </div>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      swipeDirection="right"
      showSwipeHandle={false}
      modal={false}
    >
      <DrawerContent className="panel-surface h-dvh max-h-dvh">
        <DrawerHeader className="flex-row items-center justify-between gap-2 pb-2">
          <DrawerTitle>
            {getPanelTitle(pathname, isPlaylistPanelOpen)}
          </DrawerTitle>
          <DrawerClose
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" })
            )}
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </DrawerClose>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
          {panelContent}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
