"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { LeftRailContent } from "./LeftRail";
import { useAppShell } from "./AppShellContext";
import { panelSurface } from "./shell-classes";
import { cn } from "@/lib/utils";

export function MobileNavDrawer() {
  const { isNavOpen, closeNav } = useAppShell();

  return (
    <Drawer
      open={isNavOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeNav();
        }
      }}
      swipeDirection="down"
      showSwipeHandle
      modal={false}
    >
      <DrawerContent className={cn(panelSurface, "h-[90vh] max-h-dvh")}>
        <DrawerHeader className="pb-2">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <DrawerDescription className="sr-only">
            Site navigation and now playing details
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          <LeftRailContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
