import {
  ReleaseDisplay,
  ReleaseLoading,
} from "@/app/components/ReleaseDisplay"; // eslint-disable-line import/no-unresolved
import { fetchRelease } from "@/app/services";
import { Suspense } from "react";
import { Metadata } from "next";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = "force-dynamic";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ catNo: string }>;
}): Promise<Metadata> {
  const { catNo } = await params;

  const release = await fetchRelease(catNo);
  const { metadata } = release;

  // Format artist name (handle array or string)
  const artistName = Array.isArray(metadata.creator)
    ? metadata.creator[0]
    : metadata.creator;

  const title = `${artistName} - ${metadata.title} | Archaic Horizon`;
  const description = metadata.description
    ? metadata.description.slice(0, 160) +
      (metadata.description.length > 160 ? "..." : "")
    : `Listen to ${metadata.title} by ${artistName} on Archaic Horizon`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "music.album",
      url: `https://archaichorizon.com/release/${catNo}`,
      images: [
        {
          url: `https://archaichorizon.com/api/release/${catNo}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${artistName} - ${metadata.title}`,
        },
      ],
      siteName: "Archaic Horizon",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `https://archaichorizon.com/api/release/${catNo}/opengraph-image`,
      ],
      creator: "@archaichorizon",
    },
    other: {
      "music:musician": artistName,
      "music:album": metadata.title,
      "music:release_date": metadata.date,
    },
  };
}

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ catNo: string }>;
}) {
  const { catNo } = await params;

  // Pre-fetch data on the server
  const release = await fetchRelease(catNo);

  return (
    <Suspense fallback={<ReleaseLoading />}>
      <ReleaseDisplay catNo={catNo} initialData={release} />
    </Suspense>
  );
}
