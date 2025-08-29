"use client";

import { useCollection } from "@/app/hooks/useCollection";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/date";
import type { IADocument } from "@/app/types/ia";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentWrapper } from "./ContentWrapper";
import { PageLoading } from "./PageLoading";
import { buildReleaseRoute } from "@/app/utils/url";

// Error component
export function CollectionError({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="mb-2 text-lg font-semibold text-red-800">
          Error Loading Collection
        </h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    </div>
  );
}

// Loading component
export function CollectionLoading() {
  return <PageLoading message="Loading collection..." />;
}

// Collection data component
export function CollectionDisplay({
  initialData,
}: {
  initialData: IADocument[];
}) {
  const { data: collection, isError, error } = useCollection(initialData);

  if (isError) {
    return <CollectionError error={error as Error} />;
  }

  if (!collection || collection.length === 0) {
    return (
      <ContentWrapper>
        <div className="flex items-center justify-center p-8">
          <p>No items found in the collection.</p>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <Card className="py-1">
        <CardContent className="p-1">
          <section className="grid grid-cols-1 gap-1">
            {collection.map((item) => (
              <Link
                href={buildReleaseRoute(item.cat_no || "")}
                key={item.identifier}
                className="hover:bg-muted/50 block rounded-lg p-1.5 transition-colors"
              >
                <div className="flex gap-2">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 aspect-square flex-shrink-0 overflow-hidden rounded-sm">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title || "Album cover"}
                        width={72}
                        height={72}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = item.thumbnail || "";
                        }}
                      />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    {/* Title */}
                    <h3 className="mb-2 text-base font-semibold leading-tight">
                      <span>
                        {Array.isArray(item.creator)
                          ? item.creator.join(", ")
                          : item.creator}
                      </span>
                      <span> - </span>
                      <span>{item.title || "Untitled"}</span>
                    </h3>

                    {/* Catalog Number / Date */}
                    <div className="flex flex-wrap items-center gap-2">
                      {item.cat_no && (
                        <Badge variant="outline" className="text-xs">
                          {item.cat_no}
                        </Badge>
                      )}
                      {item.date && (
                        <span className="text-muted-foreground text-sm">
                          Released on {formatDate(item.date)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
