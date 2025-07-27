import { IA } from "@/app/constants/ia";
import type {
  IADocument,
  IAAdvancedSearchResponse,
  IAErrorResponse,
} from "@/app/types/ia";
import { addThumbnailsToDocuments } from "@/app/utils/collection";

/**
 * Server-side function to fetch collection data
 * This can be used in server components and for hydration
 */
export async function getCollectionData(): Promise<IADocument[]> {
  try {
    const response = await fetch(IA.collection.baseUrl, {
      next: {
        revalidate: 2592000, // 30 days
        tags: ["collection-data"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: IAAdvancedSearchResponse = await response.json();

    if (data?.response?.docs && Array.isArray(data.response.docs)) {
      // Add thumbnail URLs to each document
      return addThumbnailsToDocuments(data.response.docs);
    }

    throw new Error("No data found in collection");
  } catch (error) {
    console.error("Failed to fetch collection data:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch collection data"
    );
  }
}
