import type { IAFile } from "@/app/types/ia";

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
export function getCoverArt(files: IAFile[]): IAFile[] {
  return files.filter((file) => {
    const name = file.name.toLowerCase();
    const format = file.format.toLowerCase();

    return (
      (format.includes("jpg") ||
        format.includes("jpeg") ||
        format.includes("png")) &&
      (name.includes("cover") ||
        name.includes("artwork") ||
        name.includes("thumb"))
    );
  });
}
