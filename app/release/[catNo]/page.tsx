import {
  ReleaseDisplay,
  ReleaseLoading,
} from "@/app/components/ReleaseDisplay";
import { fetchRelease } from "@/app/services";
import { Suspense } from "react";

interface ReleasePageProps {
  params: {
    catNo: string;
  };
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { catNo } = await params;

  // Pre-fetch data on the server
  const initialData = await fetchRelease(catNo);

  return (
    <Suspense fallback={<ReleaseLoading />}>
      <ReleaseDisplay catNo={catNo} initialData={initialData} />
    </Suspense>
  );
}
