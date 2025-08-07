import type { Track } from "@/app/utils/tracks";
import { triggerDownload } from "@/app/utils/download";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

interface TrackDownloadProps {
  track: Track;
}

export function TrackDownload({ track }: TrackDownloadProps) {
  const handleDownload = (format: "mp3" | "ogg" | "flac") => {
    const url = track.media[format]?.url;
    if (url) {
      const filename = `${track.artist} - ${track.title}.${format}`;
      triggerDownload(url, filename);
    }
  };

  console.log(track.media);

  const hasDownloadOptions =
    track.media.mp3.url || track.media.ogg.url || track.media.flac.url;

  if (!hasDownloadOptions) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex h-6 w-6 transition-opacity"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Download ${track.title}`}
        >
          <Download className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {track.media.mp3.url && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDownload("mp3");
            }}
          >
            Download MP3
          </DropdownMenuItem>
        )}
        {track.media.ogg.url && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDownload("ogg");
            }}
          >
            Download OGG
          </DropdownMenuItem>
        )}
        {track.media.flac.url && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDownload("flac");
            }}
          >
            Download FLAC
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
