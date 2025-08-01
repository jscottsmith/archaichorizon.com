import Link from "next/link";
import { Playlist } from "./Playlist";
import { Suspense } from "react";
import { MediaPlayer } from "./MediaPlayer";
import { Navigation } from "./Navigation";

export function Interface() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 flex p-4 justify-between items-center h-16">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Archaic Horizon
          </Link>
        </div>

        {/* Navigation */}
        <Navigation />
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <Playlist />
      </Suspense>

      <div className="fixed right-0 bottom-0 left-0 bg-background/90 border-t border-foreground/10 z-50">
        <MediaPlayer />
      </div>
    </>
  );
}
