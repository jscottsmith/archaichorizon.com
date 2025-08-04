import type {
  IADocument,
  IAErrorResponse,
  IAMetadataResponse,
} from "@/app/types/ia";
import { getApiUrl } from "../utils/api";

// API function to fetch collection data
export async function fetchCollection(): Promise<IADocument[]> {
  // Use relative URL - Next.js fetch will handle this correctly
  const response = await fetch(getApiUrl("/api/collection"));

  console.log("Collection API Response:", {
    status: response.status,
    statusText: response.statusText,
    contentType: response.headers.get("content-type"),
    contentLength: response.headers.get("content-length"),
    url: response.url,
  });

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || "Failed to fetch collection");
  }

  // Check if response is actually JSON
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Received non-JSON response from API:", {
      contentType,
      responseLength: text.length,
      first500Chars: text.substring(0, 500),
      url: response.url,
    });
    throw new Error(`Expected JSON but received ${contentType}`);
  }

  return response.json();
}

export async function fetchRelease(catNo: string): Promise<IAMetadataResponse> {
  // Use relative URL - Next.js fetch will handle this correctly
  const response = await fetch(getApiUrl(`/api/release/${catNo}`));

  console.log("Release API Response:", {
    status: response.status,
    statusText: response.statusText,
    contentType: response.headers.get("content-type"),
    contentLength: response.headers.get("content-length"),
    url: response.url,
    catNo,
  });

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  // Check if response is actually JSON
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Received non-JSON response from API:", {
      contentType,
      responseLength: text.length,
      first500Chars: text.substring(0, 500),
      url: response.url,
      catNo,
    });
    throw new Error(`Expected JSON but received ${contentType}`);
  }

  return response.json();
}
