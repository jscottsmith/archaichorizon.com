"use client";

import { useRelease } from "@/app/hooks/useRelease";
import { notFound } from "next/navigation";
import { useMediaPlayer } from "../contexts/MediaPlayerProvider";
import type { IAMetadataResponse } from "../types/ia";

// Loading component
export function ReleaseLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2 ">Loading release...</span>
    </div>
  );
}

// Error component
export function ReleaseError({ error }: { error: Error }) {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Release
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    </div>
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
  const { data: release, error } = useRelease(catNo, { initialData });
  const { setCatalogId } = useMediaPlayer();

  if (error) {
    return <ReleaseError error={error} />;
  }

  const { metadata } = release;

  return (
    <article className="p-6">
      <div className="space-y-6">
        {/* Basic info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Release Information</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium">Title:</span>
              <span className="ml-2">{metadata.title}</span>
            </div>
            {metadata.creator && (
              <div>
                <span className="font-medium">Artist:</span>
                <span className="ml-2">{metadata.creator}</span>
              </div>
            )}
            {metadata.date && (
              <div>
                <span className="font-medium ">Release Date:</span>
                <span className="ml-2">{metadata.date}</span>
              </div>
            )}
            <button onClick={() => setCatalogId(catNo)}>Play Album</button>
          </div>
        </div>

        {/* Description */}
        {metadata.description && (
          <div>
            <h3 className="text-lg font-semibold  mb-3">Description</h3>
            <div className="prose prose-gray max-w-none">
              <p className=" leading-relaxed">{metadata.description}</p>
            </div>
          </div>
        )}

        {/* Additional metadata */}
        <div>
          <h3 className="text-lg font-semibold  mb-3">Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium ">Media Type:</span>
              <span className="ml-2">{metadata.mediatype}</span>
            </div>
            <div>
              <span className="font-medium ">License:</span>
              <span className="ml-2">
                <a
                  href={metadata.licenseurl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View License
                </a>
              </span>
            </div>
            {metadata.subject && (
              <div className="md:col-span-2">
                <span className="font-medium ">Tags:</span>
                <span className="ml-2">{metadata.subject}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
