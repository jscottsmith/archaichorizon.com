"use client";

import { useRef, useState } from "react";

interface MediaPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

export function MediaPlayer({ src, title, artist }: MediaPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // const togglePlay = () => {
  //   if (!audioRef.current) return;

  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  // };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="p-4 flex gap-4">
      {/* Track info */}
      {(title || artist) && (
        <div className="w-1/2">
          {title && <h3 className="font-semibold">{title}</h3>}
          {artist && <p className="text-sm">{artist}</p>}
        </div>
      )}

      {/* HTML5 Audio element with native controls */}
      <audio
        ref={audioRef}
        src={src}
        controls
        className="w-full"
        onPlay={handlePlay}
        onPause={handlePause}
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>

      {/* Custom play/pause button (optional) */}
      {/* <div className="mt-4 flex justify-center">
        <button
          onClick={togglePlay}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div> */}
    </div>
  );
}
