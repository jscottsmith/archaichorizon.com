"use client";

import React from "react";
import { useAudio } from "../../stores/audioStore";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const VolumeControl = React.memo(function VolumeControl({
  className,
  width,
}: {
  className?: string;
  width?: string;
}) {
  const volume = useAudio((state) => state.volume);
  const isMuted = useAudio((state) => state.isMuted);
  const setVolume = useAudio((state) => state.setVolume);
  const toggleMute = useAudio((state) => state.toggleMute);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="h-8 w-8"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume * 100]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        className={cn("w-24", width)}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVolume(1)}
        className="h-8 w-8"
        aria-label="Set volume to maximum"
      >
        {volume < 0.5 ? <Volume1 size={16} /> : <Volume2 size={16} />}
      </Button>
    </div>
  );
});
