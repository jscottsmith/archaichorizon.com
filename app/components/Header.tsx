"use client";

import Link from "next/link";
import { MediaPlayerController } from "./MediaPlayerController";
import { useMediaPlayer } from "../contexts/MediaPlayerProvider";
import { Suspense } from "react";

export function Header() {
  const { currentCatalogId } = useMediaPlayer();

  return (
    <header>
      <div className="flex p-4 justify-between items-center h-16">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Archaic Horizon
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8">
          <Link href="/" className="px-3 py-2 text-sm font-medium">
            Home
          </Link>
          <Link href="/collection" className="px-3 py-2 text-sm font-medium">
            Collection
          </Link>
        </nav>
      </div>
      <Suspense
        fallback={
          <div className="p-4">
            <div className="w-full h-16 bg-gray-500/20 rounded-sm animate-pulse" />
          </div>
        }
      >
        <MediaPlayerController catNo={currentCatalogId} />
      </Suspense>
    </header>
  );
}
