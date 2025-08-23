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

// Error component
export function CollectionError({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-800 mb-2">
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
                href={`/release/${item.cat_no?.toLowerCase()}`}
                key={item.identifier}
                className="block transition-colors hover:bg-muted/50 rounded-lg p-1.5"
              >
                <div className="flex gap-2">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-sm aspect-square overflow-hidden flex-shrink-0">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title || "Album cover"}
                        width={72}
                        height={72}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    {/* Title */}
                    <h3 className="text-base font-semibold leading-tight mb-2">
                      <span>
                        {Array.isArray(item.creator)
                          ? item.creator.join(", ")
                          : item.creator}
                      </span>
                      <span> - </span>
                      <span>{item.title || "Untitled"}</span>
                    </h3>

                    {/* Catalog Number / Date */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.cat_no && (
                        <Badge variant="outline" className="text-xs">
                          {item.cat_no}
                        </Badge>
                      )}
                      {item.date && (
                        <span className="text-sm text-muted-foreground">
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
