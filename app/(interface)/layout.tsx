import { Suspense } from "react";
import { Playlist } from "../components/Playlist";
import { MediaPlayer, MediaPlayerMobile } from "../components/MediaPlayer";
import { Background } from "../components/Background";
import Header from "../components/Header";
import Footer from "../components/Footer";

// export const dynamic = "force-dynamic";

export default function Interface(props: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <Header />

      <main className="mb-4 min-h-screen">
        {props.children}
        <div className="sticky bottom-[calc(env(safe-area-inset-bottom)_+_0.5rem)] left-0 right-0 z-50 mx-2">
          <div className="mx-auto flex max-w-4xl flex-col gap-2">
            <Suspense fallback={null}>
              <Playlist />
            </Suspense>
            <MediaPlayer className="hidden md:block" />
            <MediaPlayerMobile className="md:hidden" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
