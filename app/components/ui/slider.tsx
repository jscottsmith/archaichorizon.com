import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

export const TRACK_CLASS = cn(
  "h-2 group-active:scale-y-150 group-active:scale-x-101 group-hover:scale-y-150 group-hover:scale-x-101 transition-all duration-300 ease-out",
  "relative w-full grow overflow-hidden rounded-full bg-secondary data-horizontal:h-2 data-vertical:w-2"
);

export const THUMB_CLASS = cn(
  "opacity-0 focus-visible:opacity-100",
  "block h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
);

type SliderProps = Omit<SliderPrimitive.Root.Props, "onValueChange"> & {
  onValueChange?: (value: number[]) => void;
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: SliderProps) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  function handleValueChange(
    nextValue: number | readonly number[]
  ) {
    if (!onValueChange) return;
    const values = Array.isArray(nextValue) ? [...nextValue] : [nextValue];
    onValueChange(values);
  }

  return (
    <SliderPrimitive.Root
      className={cn(
        "group relative flex w-full min-w-0 cursor-pointer touch-none select-none items-center",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      onValueChange={onValueChange ? handleValueChange : undefined}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full min-w-0 touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track data-slot="slider-track" className={TRACK_CLASS}>
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="absolute h-full bg-primary data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
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

export { Slider };
