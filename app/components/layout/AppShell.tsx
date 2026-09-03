"use client";

import { Suspense } from "react";
import { AppShellProvider } from "./AppShellContext";
import { PlaylistBootstrap } from "./PlaylistBootstrap";
import { CenterLogo } from "./CenterLogo";
import { LeftRail } from "./LeftRail";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { MobileNavTrigger } from "./MobileNavTrigger";
import { PlayerBar } from "./PlayerBar";
import { ContentPanel } from "./ContentPanel";
import { MediaPlayerMobile } from "../MediaPlayer";

export function AppShell(props: { children: React.ReactNode }) {
  return (
    <AppShellProvider>
      <Suspense fallback={null}>
        <PlaylistBootstrap />
      </Suspense>
      <div className="relative flex h-dvh overflow-hidden">
        <LeftRail className="hidden md:flex" />

        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1">
            <CenterLogo />
            <ContentPanel>{props.children}</ContentPanel>
          </div>

          <PlayerBar />

          <div className="sticky right-0 bottom-[calc(env(safe-area-inset-bottom)_+_0.5rem)] left-0 z-50 mx-2 md:hidden">
            <div className="mx-auto flex max-w-4xl flex-col gap-2">
              <MediaPlayerMobile />
            </div>
          </div>
        </div>

        <MobileNavTrigger />
        <MobileNavDrawer />
      </div>
    </AppShellProvider>
  );
}
