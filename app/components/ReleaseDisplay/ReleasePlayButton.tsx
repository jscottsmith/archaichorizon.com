"use client";

import { Button } from "@/app/components/ui/button";
import { Play, AudioLines } from "lucide-react";
import { usePlaylist } from "../../stores/playlistStore";
import { useAudio } from "../../stores/audioStore";
import type { Track } from "../../utils/tracks";

interface ReleasePlayButtonProps {
  catNo: string;
  tracks: Track[];
}

export function ReleasePlayButton({ catNo, tracks }: ReleasePlayButtonProps) {
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const setTracks = usePlaylist((state) => state.setTracks);

  const isPlaying = useAudio((state) => state.isPlaying);
  const play = useAudio((state) => state.play);
  const pause = useAudio((state) => state.pause);

  const isCurrentPlaylist = catNo === currentTrack?.catNo?.toLowerCase();
  const isCurrentlyPlaying = isCurrentPlaylist && isPlaying;

  const handlePlayClick = () => {
    if (isCurrentPlaylist) {
      // If this release is loaded control playback
      if (!isPlaying) {
        play();
      } else {
        pause();
      }
    } else {
      // Otherwise, set the tracks (which will start playing)
      setTracks(tracks);
      play();
    }
  };

  return (
    <Button
      onClick={handlePlayClick}
      className="w-full md:w-auto self-end min-w-36"
    >
      {isCurrentlyPlaying ? (
        <>
          <AudioLines className="mr-2 h-4 w-4 animate-pulse fill-current" />
          Now Playing
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          {isCurrentPlaylist ? "Resume" : "Play Release"}
        </>
      )}
    </Button>
  );
}
