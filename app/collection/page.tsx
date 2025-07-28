import { Suspense } from "react";

import {
  CollectionLoading,
  CollectionDisplay,
} from "@/app/components/CollectionDisplay";
import { fetchCollection } from "../services";

export default async function CollectionPage() {
  // Pre-fetch data on the server
  const initialData = await fetchCollection();

  return (
    <Suspense fallback={<CollectionLoading />}>
      <CollectionDisplay initialData={initialData} />
    </Suspense>
  );
}
