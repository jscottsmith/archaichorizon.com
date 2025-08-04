"use client"; // Error boundaries must be Client Components

import { CollectionError } from "@/app/components/CollectionDisplay";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <CollectionError error={error} />;
}
