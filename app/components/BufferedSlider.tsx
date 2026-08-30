"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
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
      className={cn("group w-full cursor-pointer", className)}
      data-slot="slider"
      value={value}
      onValueChange={onValueChange}
      max={max}
      step={step}
      disabled={disabled}
      thumbAlignment="edge"
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50">
        <SliderPrimitive.Track data-slot="slider-track" className={TRACK_CLASS}>
          <div
            className="absolute h-full animate-pulse bg-gradient-to-r from-transparent to-accent-foreground/15 transition-all duration-300 ease-out"
            style={{ width: `${bufferedProgress * 100}%` }}
          />
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="absolute h-full bg-primary"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: value.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={THUMB_CLASS}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
