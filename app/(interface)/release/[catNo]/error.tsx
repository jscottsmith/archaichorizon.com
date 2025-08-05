"use client"; // Error boundaries must be Client Components

import { ReleaseError } from "@/app/components/ReleaseDisplay";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ReleaseError error={error} />;
}
