"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CoverArtImage {
  url: string;
  alt: string;
}

interface CoverArtCarouselProps {
  images: CoverArtImage[];
  className?: string;
  width?: number;
  height?: number;
}

export function CoverArtCarousel({
  images,
  className,
  width = 300,
  height = 300,
}: CoverArtCarouselProps) {
  function renderCoverArt() {
    if (!images || images.length === 0) {
      return (
        <div className="flex aspect-square w-full items-center justify-center rounded-md bg-muted">
          <span className="text-sm text-muted-foreground">No Cover Art</span>
        </div>
      );
    }

    if (images.length === 1) {
      return (
        <div className="aspect-square w-full overflow-hidden rounded-md bg-muted/50">
          <Image
            src={images[0].url}
            alt={images[0].alt}
            width={width}
            height={height}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      );
    }

    return (
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <div className="aspect-square w-full overflow-hidden rounded-md">
          <CarouselContent className="h-full">
            {images.map((image) => (
              <CarouselItem key={image.url} className="h-full">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={width}
                  height={height}
                  className="h-full w-full rounded-md object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselDots className="mt-2" />
      </Carousel>
    );
  }

  return <div className={cn("w-full", className)}>{renderCoverArt()}</div>;
}
