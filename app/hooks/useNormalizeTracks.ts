import { useMemo } from "react";
import { normalizeTracks } from "../utils/tracks";
import { IAMetadataResponse } from "../types/ia";

export function useNormalizeTracks(metadata: IAMetadataResponse) {
  const tracks = useMemo(() => {
    if (!metadata?.files) return [];
    return normalizeTracks(metadata.files, metadata);
  }, [metadata]);

  return tracks;
}
