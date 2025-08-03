"use client";

import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

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
        "relative flex w-full touch-none select-none items-center cursor-pointer",
        className
      )}
      value={value}
      onValueChange={onValueChange}
      max={max}
      step={step}
      disabled={disabled}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
        {/* Buffered progress background */}
        <div
          className="absolute h-full bg-accent-foreground/30 transition-all duration-300 ease-out"
          style={{ width: `${bufferedProgress * 100}%` }}
        />
        {/* Playback progress */}
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}
