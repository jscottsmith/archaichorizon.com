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
      <DrawerContent className="[--drawer-content-height:90vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <DrawerDescription className="sr-only">
            Site navigation and now playing details
          </DrawerDescription>
        </DrawerHeader>
        <div className="pb-[env(safe-area-inset-bottom)]">
          <LeftRailContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
