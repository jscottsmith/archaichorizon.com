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

export default function ReleasePage({ params }: ReleasePageProps) {
  const { catNo } = params;

  return (
    <Suspense fallback={<ReleaseLoading />}>
      <ReleaseDisplay catNo={catNo} />
    </Suspense>
  );
}
