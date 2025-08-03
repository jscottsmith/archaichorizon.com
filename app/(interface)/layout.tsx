import Link from "next/link";
import { Suspense } from "react";
import { Playlist } from "../components/Playlist";
import { MediaPlayer } from "../components/MediaPlayer";
import { Navigation } from "../components/Navigation";
import { Background } from "../components/Background";

export const dynamic = "force-dynamic";

export default function Interface(props: { children: React.ReactNode }) {
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
        <Navigation />
      </header>

      <div className="fixed right-2 bottom-2 left-2 z-50">
        <div className="flex flex-col gap-2 max-w-screen-md mx-auto">
          <Suspense fallback={null}>
            <Playlist />
          </Suspense>

          <MediaPlayer />
        </div>
      </div>
      {props.children}
    </>
  );
}
