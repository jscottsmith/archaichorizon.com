"use client";

import { useRelease } from "@/app/hooks/useRelease";
import type { IAMetadataResponse } from "../types/ia";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { Card, CardContent } from "@/components/ui/card";
import { ContentWrapper } from "./ContentWrapper";
import { addCoverArtUrls, getOriginalCoverArt } from "../utils/files";
import { ReleaseDescription } from "./ReleaseDescription";
import { ReleaseHeader } from "./ReleaseDisplay/ReleaseHeader";
import { ReleaseBasicInfo } from "./ReleaseDisplay/ReleaseBasicInfo";
import { ReleaseTracks } from "./ReleaseDisplay/ReleaseTracks";
import { ReleaseDetails } from "./ReleaseDisplay/ReleaseDetails";

// Loading component
export function ReleaseLoading() {
  return (
    <ContentWrapper>
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading release...</span>
      </div>
    </ContentWrapper>
  );
}

// Error component
export function ReleaseError({ error }: { error: Error }) {
  return (
    <ContentWrapper>
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Release
          </h2>
          <p className="text-red-600">{error.message}</p>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}

// Release display component
export function ReleaseDisplay({
  catNo,
  initialData,
}: {
  catNo: string;
  initialData?: IAMetadataResponse;
}) {
  const release = useRelease(catNo, { initialData });
  const tracks = useNormalizeTracks(release.data);

  if (release.error) {
    return <ReleaseError error={release.error} />;
  }

  const { metadata } = release.data;

  // Get all cover art images
  const coverArtImages = addCoverArtUrls(
    getOriginalCoverArt(release.data.files, catNo),
    metadata.identifier
  ).map((image, index) => ({
    url: image.url,
    alt: `${metadata.title} cover art ${index + 1}`,
  }));

  return (
    <ContentWrapper>
      <Card className="pt-3">
        <ReleaseHeader catNo={catNo} />
        <CardContent className="space-y-6 px-3 md:px-6">
          {/* Cover Art and Basic Info */}
          <ReleaseBasicInfo
            title={metadata.title}
            creator={metadata.creator}
            date={metadata.date}
            coverArtImages={coverArtImages}
            catNo={catNo}
            tracks={tracks}
          />

          {/* Track List */}
          <ReleaseTracks tracks={tracks} catNo={catNo} />

          {/* Description */}
          <ReleaseDescription description={metadata.description} />

          {/* Additional metadata */}
          <ReleaseDetails
            subject={metadata.subject}
            licenseUrl={metadata.licenseurl}
          />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
