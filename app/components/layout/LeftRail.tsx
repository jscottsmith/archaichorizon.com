"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GalleryVerticalEnd,
  Info,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";
import { LogoAbbreviated } from "../Logo";
import { SITE } from "@/app/constants/site";
import { NowPlayingDetails } from "./NowPlayingDetails";
import { useAppShell } from "./AppShellContext";
import { usePlaylist } from "@/app/stores/playlistStore";

const NAV_LINKS: {
  href: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { href: ROUTES.COLLECTION, label: "Collection", icon: GalleryVerticalEnd },
  { href: ROUTES.CONTACT, label: "Contact", icon: Mail },
  { href: ROUTES.ABOUT, label: "About", icon: Info },
];

function NavLinks(props: { isMinimized?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isPlaylistPanelOpen = usePlaylist((state) => state.isPlaylistPanelOpen);
  const closePlaylistPanel = usePlaylist((state) => state.closePlaylistPanel);

  function handleNavigate() {
    if (isPlaylistPanelOpen) {
      closePlaylistPanel();
    }

    props.onNavigate?.();
  }

  return (
    <nav
      className={cn("flex flex-col gap-1", props.isMinimized && "items-center")}
    >
      {NAV_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname === link.href ||
          (link.href === ROUTES.COLLECTION && pathname.startsWith("/release/"));

        return (
          <Link
            key={link.href}
            href={link.href}
            title={props.isMinimized ? link.label : undefined}
            onClick={handleNavigate}
            className={cn(
              buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                size: props.isMinimized ? "icon-sm" : "sm",
              }),
              props.isMinimized ? "h-8 w-8" : "justify-start gap-2"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {props.isMinimized ? (
              <span className="sr-only">{link.label}</span>
            ) : (
              link.label
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function RailLogo(props: { isMinimized: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href={ROUTES.HOME}
      onClick={props.onNavigate}
      className={cn(
        "text-foreground/80 transition-colors hover:text-foreground",
        props.isMinimized
          ? "mx-auto flex items-center"
          : "flex flex-col items-start gap-1"
      )}
    >
      <LogoAbbreviated className="h-4" />
      <span className="sr-only">{SITE.name}</span>
    </Link>
  );
}

function RailCollapseToggle(props: {
  collapsible: boolean;
  isMinimized: boolean;
  onToggle: () => void;
}) {
  if (!props.collapsible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={props.isMinimized ? "Expand sidebar" : "Minimize sidebar"}
      title={props.isMinimized ? "Expand" : "Minimize"}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "h-8 w-8"
      )}
      onClick={props.onToggle}
    >
      {props.isMinimized ? (
        <PanelLeftOpen className="h-4 w-4" />
      ) : (
        <PanelLeftClose className="h-4 w-4" />
      )}
    </button>
  );
}

export function LeftRail(props: { className?: string }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-dvh shrink-0 flex-col border-r panel-surface transition-[width] duration-200",
        isMinimized ? "w-16" : "w-64",
        props.className
      )}
    >
      <LeftRailContent
        collapsible
        isMinimized={isMinimized}
        onToggleMinimized={() => setIsMinimized((minimized) => !minimized)}
      />
    </aside>
  );
}

export function LeftRailContent(props: {
  collapsible?: boolean;
  isMinimized?: boolean;
  onToggleMinimized?: () => void;
}) {
  const { closeNav } = useAppShell();
  const collapsible = props.collapsible ?? false;
  const isMinimized = collapsible ? props.isMinimized ?? false : false;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-6",
          isMinimized ? "items-center p-2" : "p-4"
        )}
      >
        <RailLogo isMinimized={isMinimized} onNavigate={closeNav} />

        <NavLinks isMinimized={isMinimized} onNavigate={closeNav} />

        <ThemeSwitcher />

        <div className={cn("mt-auto w-full", isMinimized && "flex justify-center")}>
          <RailCollapseToggle
            collapsible={collapsible}
            isMinimized={isMinimized}
            onToggle={props.onToggleMinimized ?? (() => {})}
          />
        </div>
      </div>

      {!isMinimized && (
        <div className="border-t p-4">
          <NowPlayingDetails />
        </div>
      )}
    </div>
  );
}
