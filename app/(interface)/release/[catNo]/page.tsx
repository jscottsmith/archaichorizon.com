import {
  ReleaseDisplay,
  ReleaseLoading,
} from "@/app/components/ReleaseDisplay";
import { fetchRelease } from "@/app/services";
import { Suspense } from "react";
import type { IAMetadataResponse } from "@/app/types/ia";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = "force-dynamic";

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ catNo: string }>;
}) {
  const { catNo } = await params;

  // Pre-fetch data on the server
  let release: IAMetadataResponse | undefined;

  try {
    release = await fetchRelease(catNo);
  } catch (error) {
    console.error(`Error fetching release data for ${catNo}:`, error);
    // Set to undefined to let the component handle the error
    release = undefined;
  }

  return (
    <Suspense fallback={<ReleaseLoading />}>
      <ReleaseDisplay catNo={catNo} initialData={release} />
    </Suspense>
  );
}
