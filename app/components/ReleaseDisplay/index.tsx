"use client";

import { useRelease } from "@/app/hooks/useRelease";
import type { IAMetadataResponse } from "../../types/ia";
import { useNormalizeTracks } from "@/app/hooks/useNormalizeTracks";
import { ContentWrapper } from "../ContentWrapper";
import { addCoverArtUrls, getOriginalCoverArt } from "../../utils/files";
import { ReleaseDescription } from "./ReleaseDescription";
import { ReleaseBasicInfo } from "./ReleaseBasicInfo";
import { ReleaseTracks } from "./ReleaseTracks";
import { ReleaseDetails } from "./ReleaseDetails";
import { PageLoading } from "../PageLoading";
import { Separator } from "@/components/ui/separator";
import { PanelHeader } from "../PanelHeader";
import { ROUTES } from "@/app/constants/routes";

// Loading component
export function ReleaseLoading() {
  return <PageLoading message="Loading release..." />;
}

// Error component
export function ReleaseError({ error }: { error: Error }) {
  return (
    <ContentWrapper>
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="mb-2 text-xl font-semibold text-red-800">
          Error Loading Release
        </h2>
        <p className="text-red-600">{error.message}</p>
      </div>
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
    <>
      <PanelHeader
        title={catNo}
        backHref={ROUTES.COLLECTION}
        closeHref={ROUTES.HOME}
      />
      <ContentWrapper>
        <div className="space-y-6">
          <ReleaseBasicInfo
            title={metadata.title}
            creator={metadata.creator}
            date={metadata.date}
            coverArtImages={coverArtImages}
            catNo={catNo}
            tracks={tracks}
            files={release.data.files}
            identifier={metadata.identifier}
          />
          <Separator />
          <ReleaseTracks tracks={tracks} catNo={catNo} />
          <Separator />
          <ReleaseDescription description={metadata.description} />
          <Separator />
          <ReleaseDetails
            subject={metadata.subject}
            licenseUrl={metadata.licenseurl}
          />
        </div>
      </ContentWrapper>
    </>
  );
}
