import { IA } from "@/app/constants/ia";
import { NextResponse } from "next/server";
import type {
  IAAdvancedSearchResponse,
  IADocument,
  IAErrorResponse,
} from "@/app/types/ia";

export async function GET(): Promise<
  NextResponse<IADocument[] | IAErrorResponse>
> {
  try {
    const response = await fetch(IA.collection.baseUrl);

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
      return NextResponse.json(data.response.docs);
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
