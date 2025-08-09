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
        <div className="bg-muted rounded-md flex aspect-square items-center justify-center">
          <span className="text-muted-foreground text-sm">No Cover Art</span>
        </div>
      );
    }

    if (images.length === 1) {
      return (
        <Image
          src={images[0].url}
          alt={images[0].alt}
          width={width}
          height={height}
          className="rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <div className="rounded-md overflow-hidden">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.url}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={width}
                  height={height}
                  className="rounded-md object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselDots className="mt-2" />
      </Carousel>
    );
  }

  return (
    <div className={cn("rounded-md overflow-hidden", className)}>
      {renderCoverArt()}
    </div>
  );
}
