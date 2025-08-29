"use client";

import { usePlaylist } from "../stores/playlistStore";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundImageProps {
  src: string;
  alt: string;
}

function AnimatedBackgroundImage({ src, alt }: AnimatedBackgroundImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.img
      src={src}
      alt={alt}
      className="h-full w-full max-w-none object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5, ease: "easeInOut" }}
      onLoad={() => setImageLoaded(true)}
    />
  );
}

export function Background() {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  return (
    <div className="bg-gradient-radial fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-background/50 absolute inset-0 z-10 saturate-200 backdrop-blur-3xl" />
      <AnimatePresence mode="wait">
        {currentTrack?.images?.cover && (
          <AnimatedBackgroundImage
            key={currentTrack.images.cover}
            src={currentTrack.images.cover}
            alt={`${currentTrack.title} cover art`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
