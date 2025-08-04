"use client";

import { useRelease } from "@/app/hooks/useRelease";
import { usePlaylist } from "../contexts/PlaylistProvider";
import type { IAMetadataResponse } from "../types/ia";
import { useNormalizeTracks } from "../hooks/useNormalizeTracks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContentWrapper } from "./ContentWrapper";
import { TrackList } from "./TrackList";
import { Play, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { formatDate } from "../utils/date";
import Link from "next/link";

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
  const playlist = usePlaylist();
  const tracks = useNormalizeTracks(release.data);

  if (release.error) {
    return <ReleaseError error={release.error} />;
  }

  const { metadata } = release.data;

  // Get cover art from the first track
  const coverArt = tracks[0]?.images?.cover || tracks[0]?.images?.thumbnail;

  return (
    <ContentWrapper>
      <Card className="pt-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/collection">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <CardTitle>
              <Badge className="uppercase" variant="outline">
                {catNo}
              </Badge>
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <X className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cover Art and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Art */}
            <div className="flex-shrink-0">
              {coverArt ? (
                <Image
                  src={coverArt}
                  alt={`${metadata.title} cover art`}
                  width={200}
                  height={200}
                  className="rounded-xs object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    No Cover Art
                  </span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-semibold">
                  <span>{metadata.creator}</span>
                  <span> - </span>
                  <span>{metadata.title}</span>
                </h2>

                {metadata.date && (
                  <p>
                    <span className="font-medium">Released on: </span>
                    <span>{formatDate(metadata.date)}</span>
                  </p>
                )}
              </div>

              <Button
                onClick={() => playlist.setTracks(tracks)}
                className="w-full md:w-auto self-end"
              >
                <Play className="mr-2 h-4 w-4" />
                Play Release
              </Button>
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Tracks</h3>
              <TrackList
                tracks={tracks}
                currentTrackIndex={
                  catNo === playlist.currentTrack?.catNo?.toLowerCase()
                    ? playlist.currentTrackIndex
                    : undefined
                }
                selectTrack={playlist.selectTrack}
              />
            </div>
          </div>

          {/* Description */}
          {metadata.description && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="leading-relaxed">{metadata.description}</p>
              </div>
            </div>
          )}

          {/* Additional metadata */}
          <div className="space-y-4">
            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Media Type:</span>
                  <Badge variant="outline" className="ml-2">
                    {metadata.mediatype}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">License:</span>
                  <Button variant="link" className="ml-2 p-0 h-auto" asChild>
                    <a
                      href={metadata.licenseurl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View License
                    </a>
                  </Button>
                </div>
                {metadata.subject && (
                  <div className="md:col-span-2">
                    <span className="font-medium">Tags:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {metadata.subject.split(",").map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
