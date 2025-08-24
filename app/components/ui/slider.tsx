import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export const TRACK_CLASS = cn(
  "h-2 group-active:scale-y-150 group-active:scale-x-101 transition-all duration-300 ease-out",
  "relative w-full grow overflow-hidden rounded-full bg-secondary"
);

export const THUMB_CLASS = cn(
  "opacity-0 focus-visible:opacity-100",
  "block h-3 w-3 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
);

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={TRACK_CLASS}>
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={THUMB_CLASS} />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
