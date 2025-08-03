"use client";

import { usePlaylist } from "../contexts/PlaylistProvider";
import { useAudio } from "../contexts/AudioProvider";
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  List,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// CoverImage Component
function CoverImage({ className }: { className?: string }) {
  const playlist = usePlaylist();

  if (
    !playlist.currentTrack?.images?.thumbnail &&
    !playlist.currentTrack?.images?.cover
  ) {
    return (
      <div
        className={cn(
          "flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center",
          className
        )}
      >
        <span className="text-muted-foreground text-xs">No Image</span>
      </div>
    );
  }

  return (
    <div className={cn("flex-shrink-0", className)}>
      <Image
        src={
          playlist.currentTrack!.images.thumbnail ||
          playlist.currentTrack!.images.cover!
        }
        alt={`${playlist.currentTrack!.title || "Track"} cover art`}
        width={64}
        height={64}
        className="rounded-sm object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

// ArtistInfo Component
function ArtistInfo({ className }: { className?: string }) {
  const playlist = usePlaylist();

  if (!playlist.currentTrack?.title && !playlist.currentTrack?.artist) {
    return null;
  }

  return (
    <div className={cn("flex-1 text-left", className)}>
      {playlist.currentTrack?.title && (
        <h3 className="font-semibold text-sm flex whitespace-nowrap gap-2 items-center">
          <span>{playlist.currentTrack.title}</span>
          <span className="text-xs text-muted-foreground">
            {playlist.currentTrackIndex + 1} of {playlist.totalTracks}
          </span>
        </h3>
      )}
      {playlist.currentTrack?.artist && (
        <p className="text-sm text-muted-foreground">
          {playlist.currentTrack.artist}
        </p>
      )}
      {playlist.currentTrack?.album && (
        <p className="text-xs text-muted-foreground">
          {playlist.currentTrack.album}
        </p>
      )}
    </div>
  );
}

// TrackProgress Component
function TrackProgress({ className }: { className?: string }) {
  const audio = useAudio();

  const handleSeek = (value: number[]) => {
    if (audio.duration > 0) {
      const newTime = (value[0] / 100) * audio.duration;
      audio.seek(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressValue =
    audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <Slider
        value={[progressValue]}
        onValueChange={handleSeek}
        max={100}
        step={0.1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(audio.currentTime)}</span>
        <span>{formatTime(audio.duration)}</span>
      </div>
    </div>
  );
}

// MainControls Component
function MainControls({ className }: { className?: string }) {
  const playlist = usePlaylist();
  const audio = useAudio();

  const handlePlay = async () => {
    await audio.play();
  };

  const handlePause = () => {
    audio.pause();
  };

  const handleNext = () => {
    playlist.nextTrack();
  };

  const handlePrevious = () => {
    playlist.previousTrack();
  };

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {playlist.totalTracks > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          disabled={playlist.currentTrackIndex === 0}
          aria-label="Previous track"
        >
          <SkipBack size={20} />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={audio.isPlaying ? handlePause : handlePlay}
        disabled={!playlist.currentTrack?.url || audio.isLoading}
        className="h-12 w-12"
        aria-label={
          audio.isLoading ? "Loading" : audio.isPlaying ? "Pause" : "Play"
        }
      >
        {audio.isLoading ? (
          <Loader2 size={24} className="animate-spin" />
        ) : audio.isPlaying ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" />
        )}
      </Button>

      {playlist.totalTracks > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={playlist.currentTrackIndex === playlist.totalTracks - 1}
          aria-label="Next track"
        >
          <SkipForward size={20} />
        </Button>
      )}
    </div>
  );
}

// VolumeControl Component
function VolumeControl({ className }: { className?: string }) {
  const audio = useAudio();

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    audio.setVolume(newVolume);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={audio.toggleMute}
        className="h-8 w-8"
        aria-label={audio.isMuted ? "Unmute" : "Mute"}
      >
        {audio.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
      <Slider
        value={[audio.isMuted ? 0 : audio.volume * 100]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        className="w-24"
      />
    </div>
  );
}

// PlaylistToggle Component
function PlaylistToggle({ className }: { className?: string }) {
  const playlist = usePlaylist();

  return (
    <Button
      variant={playlist.isPlaylistVisible ? "default" : "ghost"}
      size="icon"
      onClick={playlist.togglePlaylist}
      className={cn("h-8 w-8", className)}
      aria-label={
        playlist.isPlaylistVisible ? "Hide playlist" : "Show playlist"
      }
    >
      <List size={16} />
    </Button>
  );
}

// Main MediaPlayer Component
export function MediaPlayer({ className }: { className?: string }) {
  const playlist = usePlaylist();

  return (
    <Card className={cn("p-2 space-y-1", className)}>
      {/* Track info with thumbnail */}
      {(playlist.currentTrack?.title || playlist.currentTrack?.artist) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CoverImage />
            <ArtistInfo />
          </div>
          {/* Main controls */}
          <MainControls />
          <div className="flex items-center gap-2">
            <VolumeControl />
            <PlaylistToggle className="ml-auto" />
          </div>
        </div>
      )}

      {/* Progress bar */}
      <TrackProgress />
    </Card>
  );
}
