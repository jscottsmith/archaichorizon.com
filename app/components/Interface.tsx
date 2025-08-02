import Link from "next/link";
import { Playlist } from "./Playlist";
import { Suspense } from "react";
import { MediaPlayer } from "./MediaPlayer";
import { Navigation } from "./Navigation";
import { Background } from "./Background";

export function Interface() {
  return (
    <>
      <Background />
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

      <MediaPlayer className="fixed right-2 bottom-2 left-2 bg-background/90 border-foreground/10 z-50" />
    </>
  );
}
