"use client";

import React from "react";
import { useAudio } from "../../stores/audioStore";
import { cn } from "@/lib/utils";
import { BufferedSlider } from "../BufferedSlider";

export const TrackProgress = React.memo(function TrackProgress({
  className,
}: {
  className?: string;
}) {
  const currentTime = useAudio((state) => state.currentTime);
  const duration = useAudio((state) => state.duration);
  const bufferedProgress = useAudio((state) => state.bufferedProgress);
  const seek = useAudio((state) => state.seek);

  const handleSeek = (value: number[]) => {
    if (duration > 0) {
      const newTime = (value[0] / 100) * duration;
      seek(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <BufferedSlider
        bufferedProgress={bufferedProgress}
        value={[progressValue]}
        onValueChange={handleSeek}
        max={100}
        step={0.1}
        className="w-full"
      />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});
