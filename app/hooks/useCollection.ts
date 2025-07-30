import { useSuspenseQuery } from "@tanstack/react-query";
import type { IADocument } from "@/app/types/ia";
import { fetchCollection } from "../services";

export function useCollection(initialData?: IADocument[]) {
  return useSuspenseQuery({
    queryKey: ["collection"],
    queryFn: fetchCollection,
    initialData, // Hydrate with server data
  });
}
