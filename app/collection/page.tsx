import { Suspense } from "react";
import { getCollectionData } from "@/app/lib/collection";
import CollectionDisplay from "@/app/components/CollectionDisplay";

// Loading component
function CollectionLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-600">Loading collection...</span>
    </div>
  );
}

export default async function CollectionPage() {
  // Pre-fetch data on the server
  const initialData = await getCollectionData();

  return (
    <Suspense fallback={<CollectionLoading />}>
      <CollectionDisplay initialData={initialData} />
    </Suspense>
  );
}
