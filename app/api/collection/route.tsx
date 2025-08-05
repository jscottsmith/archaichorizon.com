import { IA } from "@/app/constants/ia";
import { NextResponse } from "next/server";
import type { IAAdvancedSearchResponse, IAErrorResponse } from "@/app/types/ia";
import { addThumbnailsToDocuments } from "@/app/utils/collection";

// Use Node.js runtime instead of Edge Runtime
// export const runtime = 'edge';

// Force dynamic rendering (disable caching) - uncomment if you want fresh data every time
// export const dynamic = 'force-dynamic';

// Cache the entire route for 30 days
export const revalidate = 2592000;

export async function GET(): Promise<
  NextResponse<ReturnType<typeof addThumbnailsToDocuments> | IAErrorResponse>
> {
  try {
    console.log("Fetching collection from IA:", IA.collection.baseUrl);

    // Use Next.js fetch with caching
    const response = await fetch(IA.collection.baseUrl, {
      // Cache this specific fetch for 30 days
      next: {
        revalidate: 2592000, //  30 days
        tags: ["collection-data"], // For cache invalidation
      },
    });

    console.log("IA Collection Response:", {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
      url: response.url,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("IA Error Response:", errorText.substring(0, 500));

      return NextResponse.json(
        {
          error: "Failed to fetch data",
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        } as IAErrorResponse,
        { status: response.status }
      );
    }

    // Check if response is actually JSON
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error(
        "Received non-JSON response from IA:",
        text.substring(0, 500)
      );
      return NextResponse.json(
        {
          error: "Invalid response format",
          message: `Expected JSON but received ${contentType}`,
          status: 500,
        } as IAErrorResponse,
        { status: 500 }
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
