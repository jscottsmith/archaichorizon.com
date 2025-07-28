"use client";

import Link from "next/link";
import { MediaPlayerController } from "./MediaPlayerController";
import { useMediaPlayer } from "../contexts/MediaPlayerProvider";

export function Header() {
  const { metadata } = useMediaPlayer();

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
      <MediaPlayerController metadata={metadata} />
    </header>
  );
}
