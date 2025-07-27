import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // Get the tag from the request body or use default
    const { tag = "collection-data" } = await request.json();

    // Revalidate the cache for the specified tag
    revalidateTag(tag);

    return NextResponse.json({
      message: `Cache revalidated for tag: ${tag}`,
      timestamp: new Date().toISOString(),
      status: "success",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to revalidate cache",
        message: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check cache status
export async function GET() {
  return NextResponse.json({
    message: "Cache revalidation endpoint",
    usage: "POST with body: { tag: 'collection-data' }",
    availableTags: ["collection-data"],
    timestamp: new Date().toISOString(),
  });
}
