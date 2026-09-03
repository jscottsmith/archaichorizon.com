"use client";

import { Suspense } from "react";
import { AppShellProvider, useAppShell } from "./AppShellContext";
import { PlaylistBootstrap } from "./PlaylistBootstrap";
import { CenterLogo } from "./CenterLogo";
import { LeftRail } from "./LeftRail";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { MobileNavTrigger } from "./MobileNavTrigger";
import { PlayerBar } from "./PlayerBar";
import { ContentPanel } from "./ContentPanel";
import { MediaPlayerMobile } from "../MediaPlayer";

function AppShellFrame(props: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useAppShell();

  return (
    <div
      className="group/shell relative h-dvh overflow-hidden"
      data-sidebar-collapsed={isSidebarCollapsed ? "true" : undefined}
    >
      <div className="relative h-full">
        <CenterLogo />
        <ContentPanel>{props.children}</ContentPanel>
      </div>

      <LeftRail className="hidden md:flex" />
      <PlayerBar />

      <div className="sticky right-0 bottom-[calc(env(safe-area-inset-bottom)_+_0.5rem)] left-0 z-50 mx-2 md:hidden">
        <div className="mx-auto flex max-w-4xl flex-col gap-2">
          <MediaPlayerMobile />
        </div>
      </div>

      <MobileNavTrigger />
      <MobileNavDrawer />
    </div>
  );
}

export function AppShell(props: { children: React.ReactNode }) {
  return (
    <AppShellProvider>
      <Suspense fallback={null}>
        <PlaylistBootstrap />
      </Suspense>
      <AppShellFrame>{props.children}</AppShellFrame>
    </AppShellProvider>
  );
}
