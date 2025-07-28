import { useQuery } from "@tanstack/react-query";
import { fetchRelease } from "../services";

interface UseReleaseOptions {
  catNo: string;
  enabled?: boolean;
}

export function useRelease({ catNo, enabled = true }: UseReleaseOptions) {
  return useQuery({
    queryKey: ["release", catNo],
    queryFn: () => fetchRelease(catNo),
    enabled: enabled && !!catNo,
  });
}
