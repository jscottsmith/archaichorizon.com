import { IA } from "@/app/constants/ia";
import { getIdentifierByCatNo } from "@/app/constants/releaseMap";
import { IAMetadataResponse, IAErrorResponse } from "@/app/types/ia";
import { NextResponse } from "next/server";

// Use Edge Runtime for better network access
export const runtime = "edge";

// Cache the entire route for 30 days
export const revalidate = 2592000;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ catNo: string }> }
): Promise<NextResponse<IAMetadataResponse | IAErrorResponse>> {
  try {
    const { catNo } = await params;

    if (!catNo) {
      return NextResponse.json(
        {
          error: "Missing catNo parameter",
          message: "catalog number is required in the URL path",
          status: 400,
        } as IAErrorResponse,
        { status: 400 }
      );
    }

    // Map catalog number to the correct identifier
    const identifier = getIdentifierByCatNo(catNo);

    if (!identifier) {
      return NextResponse.json(
        {
          error: "Invalid catalog number",
          message: `Catalog number '${catNo}' not found in release map`,
          status: 404,
        } as IAErrorResponse,
        { status: 404 }
      );
    }

    // Construct the metadata URL with the mapped identifier
    const metadataUrl = `${IA.metadata.baseUrl}/${identifier}`;

    // Use Next.js fetch with caching
    const response = await fetch(metadataUrl, {
      // Cache this specific fetch for 30 days
      next: {
        revalidate: 2592000, // 30 days
        tags: ["release", `release-${catNo}`, `release-${identifier}`], // For cache invalidation
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch metadata",
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        } as IAErrorResponse,
        { status: response.status }
      );
    }

    const data: IAMetadataResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching release metadata:", error);
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
