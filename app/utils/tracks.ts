import { IAFile, IAMetadataResponse, AudioFile } from "@/app/types/ia";
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
  media: {
    mp3: {
      url: string;
    };
    flac: {
      url: string;
    };
    ogg: {
      url: string;
    };
  };
  images?: {
    cover?: string;
    thumbnail?: string;
  };
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
  // Use updated getAudioFiles function to get tracks organized by track number
  const audioTracks = getAudioFiles(files);

  // Get cover art files
  const coverArtFiles = getCoverArt(files, metadata.metadata.cat_no);

  // Find the main cover image (prefer cover.jpg, then any cover image)
  const mainCover =
    coverArtFiles.find((file) => file.name.toLowerCase().includes("1")) ||
    coverArtFiles[0];

  // Find thumbnail image
  const thumbnail = coverArtFiles.find(
    (file) =>
      file.name.toLowerCase().includes("1") &&
      file.name.toLowerCase().includes("thumb")
  );

  // Convert audio tracks to Track objects
  return audioTracks
    .map((track) => {
      // Get the primary file (prefer original source, then mp3, then ogg, then flac)
      const originalFiles = [
        track.media.mp3,
        track.media.ogg,
        track.media.flac,
      ].filter((file) => file?.source === "original");

      // Prefer original files, then fall back formats
      const primaryFile =
        originalFiles[0] ||
        track.media.mp3 ||
        track.media.ogg ||
        track.media.flac;

      if (!primaryFile) {
        // Skip tracks without any audio files
        console.warn("No primary file found for track", track);
        return null;
      }

      return {
        name: primaryFile.name,
        title: track.title || primaryFile.title || "",
        artist: track.artist || primaryFile.artist || metadata.metadata.creator,
        album: track.album || primaryFile.album || "",
        url: replaceUrlParams(IA.serve.url, {
          identifier: metadata.metadata.identifier,
          filename: primaryFile.name,
        }),
        track: track.trackNumber,
        length: track.length || primaryFile.length,
        catNo: metadata.metadata.cat_no,
        media: {
          mp3: track.media.mp3
            ? {
                url: replaceUrlParams(IA.serve.url, {
                  identifier: metadata.metadata.identifier,
                  filename: track.media.mp3.name,
                }),
              }
            : { url: "" },
          flac: track.media.flac
            ? {
                url: replaceUrlParams(IA.serve.url, {
                  identifier: metadata.metadata.identifier,
                  filename: track.media.flac.name,
                }),
              }
            : { url: "" },
          ogg: track.media.ogg
            ? {
                url: replaceUrlParams(IA.serve.url, {
                  identifier: metadata.metadata.identifier,
                  filename: track.media.ogg.name,
                }),
              }
            : { url: "" },
        },
        images: {
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
        },
      } as Track;
    })
    .filter((track): track is Track => track !== null); // Remove null tracks
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
