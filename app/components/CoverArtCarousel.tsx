"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

interface CoverArtImage {
  url: string;
  alt: string;
}

interface CoverArtCarouselProps {
  images: CoverArtImage[];
  className?: string;
}

export function CoverArtCarousel({ images, className }: CoverArtCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-[200px] h-[200px] bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No Cover Art</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={className}>
        <Image
          src={images[0].url}
          alt={images[0].alt}
          width={200}
          height={200}
          className="rounded-xs object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-[300px]"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image.url}
                alt={image.alt}
                width={300}
                height={300}
                className="rounded-sm object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-2" />
      </Carousel>
    </div>
  );
}
