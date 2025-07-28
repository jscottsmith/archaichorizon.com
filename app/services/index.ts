import type { IADocument, IAErrorResponse } from "@/app/types/ia";
import { getApiUrl } from "@/app/utils/api";

// API function to fetch collection data
export async function fetchCollection(): Promise<IADocument[]> {
  const response = await fetch(getApiUrl("/api/collection"));

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || "Failed to fetch collection");
  }

  return response.json();
}

export async function fetchRelease(catNo: string): Promise<IAMetadataResponse> {
  const response = await fetch(getApiUrl(`/api/release/${catNo}`));

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}
