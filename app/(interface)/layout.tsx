import Link from "next/link";
import { Suspense } from "react";
import { Playlist } from "../components/Playlist";
import { MediaPlayer, MediaPlayerMobile } from "../components/MediaPlayer";
import { Navigation } from "../components/Navigation";
import { Background } from "../components/Background";
import Logo from "../components/Logo";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export const dynamic = "force-dynamic";

export default function Interface(props: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <header className="fixed top-0 left-0 right-0 z-50 flex px-4 h-20 justify-between items-center">
        <ThemeSwitcher />
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-foreground/80 hover:text-foreground">
            <Logo className="h-24 sm:h-32 group" />
          </Link>
        </div>
        <Navigation />
      </header>
      <div className="fixed right-2 bottom-2 left-2 z-50">
        <div className="flex flex-col gap-2 max-w-screen-md mx-auto">
          <Suspense fallback={null}>
            <Playlist />
          </Suspense>
          <MediaPlayer className="md:block hidden" />
          <MediaPlayerMobile className="md:hidden" />
        </div>
      </div>
      {props.children}
    </>
  );
}
