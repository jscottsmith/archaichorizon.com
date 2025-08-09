"use client";

import { CoverArtCarousel } from "../CoverArtCarousel";
import { formatDate } from "../../utils/date";
import { ReleasePlayButton } from "./ReleasePlayButton";
import type { Track } from "../../utils/tracks";

interface ReleaseBasicInfoProps {
  title: string;
  creator: string;
  date?: string;
  coverArtImages: Array<{ url: string; alt: string }>;
  catNo: string;
  tracks: Track[];
}

export function ReleaseBasicInfo({
  title,
  creator,
  date,
  coverArtImages,
  catNo,
  tracks,
}: ReleaseBasicInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Cover Art */}
      <div className="flex-shrink-0">
        <CoverArtCarousel images={coverArtImages} />
      </div>

      {/* Basic Info */}
      <div className="flex-1 space-y-4">
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">
            <span>{creator}</span>
            <span> - </span>
            <span>{title}</span>
          </h2>

          {date && (
            <p>
              <span className="font-medium">Released on: </span>
              <span>{formatDate(date)}</span>
            </p>
          )}
        </div>

        <ReleasePlayButton catNo={catNo} tracks={tracks} />
      </div>
    </div>
  );
}
