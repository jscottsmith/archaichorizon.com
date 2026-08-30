"use client";

import React from "react";
import { useAudio } from "../../stores/audioStore";
import { Button } from "@/components/ui/button";
import { Slider } from "../ui/slider";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const VolumeControl = React.memo(function VolumeControl({
  className,
  expanded = false,
}: {
  className?: string;
  expanded?: boolean;
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
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="h-8 w-8 shrink-0"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume * 100]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        className={cn(expanded ? "min-w-0 flex-1" : "w-24 shrink-0")}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVolume(1)}
        className="h-8 w-8 shrink-0"
        aria-label="Set volume to maximum"
      >
        {volume < 0.5 ? <Volume1 size={16} /> : <Volume2 size={16} />}
      </Button>
    </div>
  );
});
