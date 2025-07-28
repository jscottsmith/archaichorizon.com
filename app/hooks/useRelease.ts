import { useQuery } from "@tanstack/react-query";
import { IAMetadataResponse, IAErrorResponse } from "@/app/types/ia";

interface UseReleaseOptions {
  catNo: string;
  enabled?: boolean;
}

export function useRelease({ catNo, enabled = true }: UseReleaseOptions) {
  return useQuery({
    queryKey: ["release", catNo],
    queryFn: async (): Promise<IAMetadataResponse> => {
      const response = await fetch(`/api/release/${catNo}`);

      if (!response.ok) {
        const errorData: IAErrorResponse = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return response.json();
    },
    enabled: enabled && !!catNo,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
