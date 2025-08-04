import { Suspense } from "react";

import {
  CollectionLoading,
  CollectionDisplay,
} from "@/app/components/CollectionDisplay";
import { fetchCollection } from "../../services";
import type { IADocument } from "../../types/ia";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  // Pre-fetch data on the server
  let initialData: IADocument[];

  try {
    initialData = await fetchCollection();
  } catch (error) {
    console.error("Error fetching collection data:", error);
    // Return empty array as fallback
    initialData = [];
  }

  return (
    <Suspense fallback={<CollectionLoading />}>
      <CollectionDisplay initialData={initialData} />
    </Suspense>
  );
}
