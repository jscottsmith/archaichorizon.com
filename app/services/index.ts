import type {
  IADocument,
  IAErrorResponse,
  IAMetadataResponse,
} from "@/app/types/ia";

// API function to fetch collection data
export async function fetchCollection(): Promise<IADocument[]> {
  // Use relative URL - Next.js fetch will handle this correctly
  const response = await fetch("/api/collection");

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || "Failed to fetch collection");
  }

  return response.json();
}

export async function fetchRelease(catNo: string): Promise<IAMetadataResponse> {
  // Use relative URL - Next.js fetch will handle this correctly
  const response = await fetch(`/api/release/${catNo}`);

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}
