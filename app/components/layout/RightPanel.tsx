"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
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
import { PlaylistPanel } from "../Playlist";
import {
  getPanelTitle,
  isContentRoute,
  showRightPanel,
} from "./layout-utils";

const CLOSE_ANIMATION_MS = 450;

export function RightPanel(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  const isPlaylistVisible = usePlaylist((state) => state.isPlaylistVisible);
  const togglePlaylist = usePlaylist((state) => state.togglePlaylist);
  const panelVisible = showRightPanel(pathname, isPlaylistVisible);
  const [open, setOpen] = useState(panelVisible);

  useEffect(() => {
    setOpen(panelVisible);
  }, [panelVisible]);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      if (isPlaylistVisible) {
        togglePlaylist();

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

  const panelContent = isPlaylistVisible ? <PlaylistPanel /> : props.children;

  if (isDesktop) {
    return (
      <div className="absolute inset-0 z-10 flex flex-col bg-background/80 backdrop-blur-sm">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
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
    >
      <DrawerContent className="h-dvh max-h-dvh">
        <DrawerHeader className="flex-row items-center justify-between gap-2 pb-2">
          <DrawerTitle>{getPanelTitle(pathname, isPlaylistVisible)}</DrawerTitle>
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
