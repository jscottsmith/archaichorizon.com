"use client";

import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { THUMB_CLASS, TRACK_CLASS } from "./ui/slider";

interface BufferedSliderProps {
  bufferedProgress: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

export function BufferedSlider({
  value,
  bufferedProgress,
  onValueChange,
  max = 100,
  step = 0.1,
  className,
  disabled = false,
}: BufferedSliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn(
        "group relative flex w-full cursor-pointer touch-none select-none items-center",
        className
      )}
      value={value}
      onValueChange={onValueChange}
      max={max}
      step={step}
      disabled={disabled}
    >
      <SliderPrimitive.Track className={TRACK_CLASS}>
        {/* Buffered progress background */}
        <div
          className="to-accent-foreground/15 absolute h-full animate-pulse bg-gradient-to-r from-transparent transition-all duration-300 ease-out"
          style={{ width: `${bufferedProgress * 100}%` }}
        />
        {/* Playback progress */}
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={THUMB_CLASS} />
    </SliderPrimitive.Root>
  );
}
