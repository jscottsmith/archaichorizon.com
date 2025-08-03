import {
  ReleaseDisplay,
  ReleaseLoading,
} from "@/app/components/ReleaseDisplay";
import { fetchRelease } from "@/app/services";
import { Suspense } from "react";

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
