import { IA } from "@/app/constants/ia";
import type { IADocument } from "@/app/types/ia";

// Extended document type with thumbnail
export interface IADocumentWithThumbnail extends IADocument {
  thumbnail: string;
}

/**
 * Adds thumbnail URLs to collection documents
 * @param docs - Array of documents from the Internet Archive API
 * @returns Array of documents with thumbnail URLs added
 */
export function addThumbnailsToDocuments(
  docs: IADocument[]
): IADocumentWithThumbnail[] {
  return docs.map((doc) => ({
    ...doc,
    thumbnail: `${IA.images.baseUrl}/${doc.identifier}`,
  }));
}

/**
 * Utility function to get thumbnail URL for a single document
 * @param identifier - The document identifier
 * @returns Thumbnail URL
 */
export function getThumbnailUrl(identifier: string): string {
  return `${IA.images.baseUrl}/${identifier}`;
}
