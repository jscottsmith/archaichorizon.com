"use client";

import { CoverArtCarousel } from "../CoverArtCarousel";
import { formatDate } from "../../utils/date";
import { ReleasePlayButton } from "./ReleasePlayButton";
import { ReleaseDownloadDropdown } from "./ReleaseDownloadDropdown";
import type { Track } from "../../utils/tracks";
import type { IAFile } from "../../types/ia";

interface ReleaseBasicInfoProps {
  title: string;
  creator: string;
  date?: string;
  coverArtImages: Array<{ url: string; alt: string }>;
  catNo: string;
  tracks: Track[];
  files: IAFile[];
  identifier: string;
}

export function ReleaseBasicInfo({
  title,
  creator,
  date,
  coverArtImages,
  catNo,
  tracks,
  files,
  identifier,
}: ReleaseBasicInfoProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <CoverArtCarousel
        images={coverArtImages}
        className="mx-auto max-w-[300px] flex-shrink-0"
      />

      {/* Basic Info */}
      <div className="flex-1 content-center space-y-4">
        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-xl text-balance">{creator}</h2>
            <h3 className="text-4xl font-light text-balance">{title}</h3>
          </div>
          {date && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Released on: </span>
              <span>{formatDate(date)}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
          <ReleasePlayButton catNo={catNo} tracks={tracks} />
          <ReleaseDownloadDropdown files={files} identifier={identifier} />
        </div>
      </div>
    </div>
  );
}
