import { IA } from "@/app/constants/ia";
import { getIdentifierByCatNo } from "@/app/constants/releaseMap";
import { IAMetadataResponse, IAErrorResponse } from "@/app/types/ia";
import { NextResponse } from "next/server";

// Use Node.js runtime instead of Edge Runtime
// export const runtime = "edge";

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

    console.log("Fetching from IA:", metadataUrl);

    // Use Next.js fetch with caching
    const response = await fetch(metadataUrl, {
      // Cache this specific fetch for 30 days
      next: {
        revalidate: 2592000, // 30 days
        tags: ["release", `release-${catNo}`, `release-${identifier}`], // For cache invalidation
      },
    });

    console.log("IA Response:", {
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
          error: "Failed to fetch metadata",
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
