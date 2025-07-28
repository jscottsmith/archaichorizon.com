"use client";

import { useCollection } from "@/app/hooks/useCollection";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/date";
import type { IADocument } from "@/app/types/ia";

// Error component
function CollectionError({ error }: { error: Error }) {
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
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2">Loading collection...</span>
    </div>
  );
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
      <div className="flex items-center justify-center p-8">
        <p>No items found in the collection.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-2">
      {collection.map((item) => (
        <Link
          href={`/release/${item.cat_no?.toLowerCase()}`}
          key={item.identifier}
          className="block hover:bg-gray-500/10 transition-colors rounded-lg p-2"
        >
          <article className="flex gap-2">
            {/* Thumbnail */}
            <div className="w-18 h-18 rounded-sm aspect-square overflow-hidden">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title || "Album cover"}
                  width={72}
                  height={72}
                />
              )}
            </div>

            <div className="flex flex-col justify-center">
              {/* Title */}
              <h2>
                <span>
                  {Array.isArray(item.creator)
                    ? item.creator.join(", ")
                    : item.creator}
                </span>
                <span> - </span>
                <span>{item.title || "Untitled"}</span>
              </h2>

              {/* Catalog Number / Date */}
              {item.date && (
                <p className="text-sm">
                  {item.cat_no} - Released on {formatDate(item.date)}
                </p>
              )}
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}
