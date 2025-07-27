"use client";

import { useQuery } from "@tanstack/react-query";
import type { IADocument, IAErrorResponse } from "@/app/types/ia";

// API function to fetch collection data
async function fetchCollection(): Promise<IADocument[]> {
  const response = await fetch("/api/collection");

  if (!response.ok) {
    const errorData: IAErrorResponse = await response.json();
    throw new Error(errorData.message || "Failed to fetch collection");
  }

  return response.json();
}

export function useCollection(initialData?: IADocument[]) {
  return useQuery({
    queryKey: ["collection"],
    queryFn: fetchCollection,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    initialData, // Hydrate with server data
  });
}
