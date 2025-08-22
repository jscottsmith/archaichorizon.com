import { Suspense } from "react";
import { Playlist } from "../components/Playlist";
import { MediaPlayer, MediaPlayerMobile } from "../components/MediaPlayer";
import { Background } from "../components/Background";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

export default function Interface(props: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <Header />

      <main className="min-h-screen mb-4">
        {props.children}
        <div className="sticky bottom-2 mx-2 left-0 right-0 z-50">
          <div className="flex flex-col gap-2 max-w-screen-md mx-auto">
            <Suspense fallback={null}>
              <Playlist />
            </Suspense>
            <MediaPlayer className="md:block hidden" />
            <MediaPlayerMobile className="md:hidden" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
