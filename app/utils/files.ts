import type { IAFile, AudioFile } from "@/app/types/ia";
import { replaceUrlParams } from "./url";
import { IA } from "@/app/constants/ia";

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

  return 0;
}

/**
 * Get base track name without extension and quality suffix
 * @param filename - Audio file filename
 * @returns Base track name
 */
export function getBaseTrackName(filename: string): string {
  // Remove file extension
  let baseName = filename.replace(/\.(mp3|ogg|flac|wav)$/i, "");

  // Remove quality suffixes like _vbr
  baseName = baseName.replace(/_vbr$/i, "");

  return baseName;
}

/**
 * Get audio files organized by track, ordered by track number
 * @param files - Array of files
 * @returns Array of track objects with all available file types
 */
export function getAudioFiles(files: IAFile[]): AudioFile[] {
  // Filter audio files
  const audioFiles = files.filter(
    (file) =>
      file.format.toLowerCase().includes("mp3") ||
      file.format.toLowerCase().includes("ogg") ||
      file.format.toLowerCase().includes("wav") ||
      file.format.toLowerCase().includes("flac")
  );

  // Group files by base track name
  const trackGroups = new Map<string, AudioFile>();

  audioFiles.forEach((file) => {
    const baseName = getBaseTrackName(file.name);
    const trackNumber = extractTrackNumber(file);

    // Determine file type
    let fileType: "mp3" | "flac" | "ogg" | null = null;
    if (file.format.toLowerCase().includes("mp3")) fileType = "mp3";
    else if (file.format.toLowerCase().includes("flac")) fileType = "flac";
    else if (file.format.toLowerCase().includes("ogg")) fileType = "ogg";

    if (!fileType) return;

    // Get or create track group
    let trackGroup = trackGroups.get(baseName);
    if (!trackGroup) {
      trackGroup = {
        trackNumber,
        baseName,
        title: file.title || "",
        artist: file.artist || "",
        album: file.album || "",
        length: file.length,
        media: {},
      };
      trackGroups.set(baseName, trackGroup);

      // If no track number found, return 0
    }

    // Add file to media object
    trackGroup.media[fileType] = file;

    // Update metadata if this file has better info
    if (file.title && !trackGroup.title) trackGroup.title = file.title;
    if (file.artist && !trackGroup.artist) trackGroup.artist = file.artist;
    if (file.album && !trackGroup.album) trackGroup.album = file.album;
    if (file.length && !trackGroup.length) trackGroup.length = file.length;
    if (trackGroup.trackNumber === 0) {
      console.warn("No track number found for file", trackGroup);
    }
  });

  // Convert to array and sort by track number
  const sortedTracks = Array.from(trackGroups.values()).sort(
    (a, b) => a.trackNumber - b.trackNumber
  );

  return sortedTracks;
}

/**
 * Get cover art files
 * @param files - Array of files
 * @returns Array of cover art files
 */
export function getCoverArt(files: IAFile[], catNo: string): IAFile[] {
  return files.filter((file) => {
    const name = file.name.toLowerCase();
    const format = file.format.toLowerCase();

    return (
      (format.includes("jpg") || format.includes("jpeg")) &&
      (name.includes("cover") || name.includes(catNo))
    );
  });
}

/**
 * Get original cover art files (source === "original")
 * @param files - Array of files
 * @param catNo - Catalog number
 * @returns Array of original cover art files
 */
export function getOriginalCoverArt(files: IAFile[], catNo: string): IAFile[] {
  return getCoverArt(files, catNo).filter((file) => file.source === "original");
}

/**
 * Add URL to IAFile objects for cover art
 * @param files - Array of IAFile objects
 * @param identifier - Internet Archive identifier
 * @returns Array of IAFile objects with URL property added
 */
export function addCoverArtUrls(
  files: IAFile[],
  identifier: string
): (IAFile & { url: string })[] {
  return files.map((file) => ({
    ...file,
    url: replaceUrlParams(IA.serve.url, {
      identifier,
      filename: file.name,
    }),
  }));
}
