import { IA } from "@/app/constants/ia";
import { NextResponse } from "next/server";

// Cache the entire route for 30 days
export const revalidate = 2592000;

interface MetadataRouteParams {
  params: {
    identifier: string;
  };
}

export async function GET(
  request: Request,
  { params }: MetadataRouteParams
): Promise<NextResponse> {
  try {
    const { identifier } = params;

    if (!identifier) {
      return NextResponse.json(
        {
          error: "Missing identifier parameter",
          message: "Identifier is required in the URL path",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Construct the metadata URL with the identifier
    const metadataUrl = `${IA.metadata.baseUrl}/${identifier}`;

    // Use Next.js fetch with caching
    const response = await fetch(metadataUrl, {
      // Cache this specific fetch for 30 days
      next: {
        revalidate: 2592000, // 30 days
        tags: ["metadata", `metadata-${identifier}`], // For cache invalidation
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch metadata",
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
      },
      { status: 500 }
    );
  }
}
