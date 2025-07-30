import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchRelease } from "../services";
import type { IAMetadataResponse } from "../types/ia";

interface UseReleaseOptions
  extends Omit<
    UseQueryOptions<
      IAMetadataResponse,
      Error,
      IAMetadataResponse,
      readonly ["release", string]
    >,
    "queryKey" | "queryFn"
  > {
  catNo?: string;
  initialData?: IAMetadataResponse;
}

export function useRelease(
  catNo: string = "",
  options: UseReleaseOptions = {}
) {
  const catalogId = catNo.toLowerCase();
  return useSuspenseQuery({
    queryKey: ["release", catalogId],
    queryFn: () => fetchRelease(catalogId),
    enabled: options.enabled !== false && !!catalogId,
    ...options,
  });
}
