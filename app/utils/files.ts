import type { IAFile } from "@/app/types/ia";
import { replaceUrlParams } from "./url";
import { IA } from "@/app/constants/ia";

/**
 * Get audio files organized by quality/format
 * @param files - Array of files
 * @returns Object with audio files organized by format
 */
export function getAudioFiles(files: IAFile[]): {
  mp3: IAFile[];
  ogg: IAFile[];
} {
  const audioFiles = files.filter(
    (file) =>
      file.format.toLowerCase().includes("mp3") ||
      file.format.toLowerCase().includes("ogg") ||
      file.format.toLowerCase().includes("wav") ||
      file.format.toLowerCase().includes("flac")
  );

  return {
    mp3: audioFiles.filter(
      (file) =>
        file.format.toLowerCase().includes("mp3") && file.source === "original"
    ),
    ogg: audioFiles.filter((file) => file.format.toLowerCase().includes("ogg")),
  };
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
