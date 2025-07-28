import {
  ReleaseDisplay,
  ReleaseLoading,
} from "@/app/components/ReleaseDisplay";
import { Suspense } from "react";

interface ReleasePageProps {
  params: {
    catNo: string;
  };
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { catNo } = await params;

  return (
    <Suspense fallback={<ReleaseLoading />}>
      <ReleaseDisplay catNo={catNo} />
    </Suspense>
  );
}
