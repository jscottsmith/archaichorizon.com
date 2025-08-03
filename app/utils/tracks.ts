import { IAFile, IAMetadataResponse } from "@/app/types/ia";
import { replaceUrlParams } from "./url";
import { getAudioFiles, getCoverArt } from "./files";
import { IA } from "@/app/constants/ia";

export interface Track {
  name: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  track: number;
  length?: string;
  catNo: string;
  images?: {
    cover?: string;
    thumbnail?: string;
  };
}

/**
 * Extract track number from file metadata or filename
 * @param file - IA file object
 * @returns Track number as number, or 0 if not found
 */
export function extractTrackNumber(file: IAFile): number {
  // First try to extract from track metadata
  if (file.track) {
    const trackMatch = file.track.match(/^(\d+)/);
    if (trackMatch) {
      return Number(trackMatch[1]);
    }
  }

  // Fallback to extracting from filename (e.g., "01_trackname.mp3")
  const filenameMatch = file.name.match(/^(\d+)_/);
  if (filenameMatch) {
    return Number(filenameMatch[1]);
  }

  // If no track number found, return 0
  return 0;
}

/**
 * Normalize audio files into Track objects
 * @param files - Array of audio files from IA metadata
 * @param metadata - The IA metadata response
 * @returns Array of normalized Track objects
 */
export function normalizeTracks(
  files: IAFile[],
  metadata: IAMetadataResponse
): Track[] {
  // Use existing getAudioFiles function to filter audio files
  const audioFiles = getAudioFiles(files);

  // Get cover art files
  const coverArtFiles = getCoverArt(files);

  // Find the main cover image (prefer cover.jpg, then any cover image)
  const mainCover =
    coverArtFiles.find(
      (file) =>
        file.name.toLowerCase().includes("cover.jpg") ||
        file.name.toLowerCase().includes("cover.png")
    ) || coverArtFiles[0];

  // Find thumbnail image
  const thumbnail = coverArtFiles.find(
    (file) =>
      file.name.toLowerCase().includes("thumb") ||
      file.name.toLowerCase().includes("small")
  );

  // Use MP3 files from the filtered audio files
  return audioFiles.mp3
    .map((file) => {
      // Generate image URLs if cover art is available
      const images =
        mainCover || thumbnail
          ? {
              cover: mainCover
                ? replaceUrlParams(IA.serve.url, {
                    identifier: metadata.metadata.identifier,
                    filename: mainCover.name,
                  })
                : undefined,
              thumbnail: thumbnail
                ? replaceUrlParams(IA.serve.url, {
                    identifier: metadata.metadata.identifier,
                    filename: thumbnail.name,
                  })
                : undefined,
            }
          : undefined;

      return {
        name: file.name,
        title: file.title ?? "",
        artist: file.artist ?? metadata.metadata.creator,
        album: file.album ?? "",
        url: replaceUrlParams(IA.serve.url, {
          identifier: metadata.metadata.identifier,
          filename: file.name,
        }),
        track: extractTrackNumber(file),
        length: file.length,
        catNo: metadata.metadata.cat_no,
        images,
      };
    })
    .sort((a, b) => a.track - b.track); // Sort by track number
}

/**
 * Format seconds into minutes:seconds format
 * @param seconds - Number of seconds as string or number
 * @returns Formatted time string (e.g., "3:45")
 */
export function formatTrackLength(seconds: string | number): string {
  const totalSeconds =
    typeof seconds === "string" ? parseInt(seconds, 10) : seconds;

  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return "";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
