import { IA } from "@/app/constants/ia";
import { NextResponse } from "next/server";
import type { IAAdvancedSearchResponse, IAErrorResponse } from "@/app/types/ia";
import { addThumbnailsToDocuments } from "@/app/utils/collection";

// Use Edge Runtime for better network access
export const runtime = "edge";

// Force dynamic rendering (disable caching) - uncomment if you want fresh data every time
// export const dynamic = 'force-dynamic';

// Cache the entire route for 30 days
export const revalidate = 2592000;

export async function GET(): Promise<
  NextResponse<ReturnType<typeof addThumbnailsToDocuments> | IAErrorResponse>
> {
  try {
    // Use Next.js fetch with caching
    const response = await fetch(IA.collection.baseUrl, {
      // Cache this specific fetch for 30 days
      next: {
        revalidate: 2592000, //  30 days
        tags: ["collection-data"], // For cache invalidation
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch data",
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        } as IAErrorResponse,
        { status: response.status }
      );
    }

    const data: IAAdvancedSearchResponse = await response.json();

    if (data?.response?.docs && Array.isArray(data.response.docs)) {
      // Add thumbnail URLs to each document
      const docsWithThumbnails = addThumbnailsToDocuments(data.response.docs);
      return NextResponse.json(docsWithThumbnails);
    }

    return NextResponse.json(
      {
        error: "No data found",
        message: "The collection is empty or the response format is unexpected",
        status: 404,
      } as IAErrorResponse,
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
      } as IAErrorResponse,
      { status: 500 }
    );
  }
}
