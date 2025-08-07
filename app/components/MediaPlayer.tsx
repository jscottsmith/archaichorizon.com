"use client";

import React from "react";
import { usePlaylist } from "../stores/playlistStore";
import { useAudio } from "../stores/audioStore";
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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BufferedSlider } from "./BufferedSlider";

// CoverImage Component
const CoverImage = React.memo(function CoverImage({
  className,
}: {
  className?: string;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  if (!currentTrack?.images?.thumbnail && !currentTrack?.images?.cover) {
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
        src={currentTrack!.images.thumbnail || currentTrack!.images.cover!}
        alt={`${currentTrack!.title || "Track"} cover art`}
        width={64}
        height={64}
        className="rounded-sm object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
});

// ArtistInfo Component
const ArtistInfo = React.memo(function ArtistInfo({
  className,
}: {
  className?: string;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);

  if (!currentTrack?.title && !currentTrack?.artist) {
    return null;
  }

  return (
    <div className={cn("flex-1 text-left min-w-0", className)}>
      {currentTrack?.title && (
        <h3 className="font-semibold text-sm flex whitespace-nowrap gap-2 items-center min-w-0">
          <span className="truncate">{currentTrack.title}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {currentTrackIndex + 1} of {totalTracks}
          </span>
        </h3>
      )}
      {currentTrack?.artist && (
        <p className="text-sm text-muted-foreground truncate">
          {currentTrack.artist}
        </p>
      )}
      {currentTrack?.album && (
        <p className="text-xs text-muted-foreground truncate">
          {currentTrack.album}
        </p>
      )}
    </div>
  );
});

// TrackProgress Component
const TrackProgress = React.memo(function TrackProgress({
  className,
}: {
  className?: string;
}) {
  const currentTime = useAudio((state) => state.currentTime);
  const duration = useAudio((state) => state.duration);
  const bufferedProgress = useAudio((state) => state.bufferedProgress);
  const seek = useAudio((state) => state.seek);

  const handleSeek = (value: number[]) => {
    if (duration > 0) {
      const newTime = (value[0] / 100) * duration;
      seek(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <BufferedSlider
        bufferedProgress={bufferedProgress}
        value={[progressValue]}
        onValueChange={handleSeek}
        max={100}
        step={0.1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});

// MainControls Component
const MainControls = React.memo(function MainControls({
  className,
}: {
  className?: string;
}) {
  const isPlaying = useAudio((state) => state.isPlaying);
  const isLoading = useAudio((state) => state.isLoading);
  const play = useAudio((state) => state.play);
  const pause = useAudio((state) => state.pause);
  const nextTrack = usePlaylist((state) => state.nextTrack);
  const previousTrack = usePlaylist((state) => state.previousTrack);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);

  const handlePlay = async () => {
    await play();
  };

  const handlePause = () => {
    pause();
  };

  const handleNext = () => {
    nextTrack();
  };

  const handlePrevious = () => {
    previousTrack();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 md:gap-2 lg:gap-4",
        className
      )}
    >
      {totalTracks > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          disabled={currentTrackIndex === 0}
          aria-label="Previous track"
        >
          <SkipBack size={20} />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={isPlaying ? handlePause : handlePlay}
        disabled={!currentTrack?.url || isLoading}
        className="h-12 w-12"
        aria-label={isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <Loader2 size={24} className="animate-spin" />
        ) : isPlaying ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" />
        )}
      </Button>

      {totalTracks > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={currentTrackIndex === totalTracks - 1}
          aria-label="Next track"
        >
          <SkipForward size={20} />
        </Button>
      )}
    </div>
  );
});

// VolumeControl Component
const VolumeControl = React.memo(function VolumeControl({
  className,
}: {
  className?: string;
}) {
  const volume = useAudio((state) => state.volume);
  const isMuted = useAudio((state) => state.isMuted);
  const setVolume = useAudio((state) => state.setVolume);
  const toggleMute = useAudio((state) => state.toggleMute);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="h-8 w-8"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume * 100]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        className="w-24"
      />
    </div>
  );
});

// PlaylistToggle Component
const PlaylistToggle = React.memo(function PlaylistToggle({
  className,
}: {
  className?: string;
}) {
  const isPlaylistVisible = usePlaylist((state) => state.isPlaylistVisible);
  const togglePlaylist = usePlaylist((state) => state.togglePlaylist);

  return (
    <Button
      variant={isPlaylistVisible ? "default" : "ghost"}
      size="icon"
      onClick={togglePlaylist}
      className={cn("h-8 w-8", className)}
      aria-label={isPlaylistVisible ? "Hide playlist" : "Show playlist"}
    >
      <List size={16} />
    </Button>
  );
});

// TrackInfo Component - combines cover and artist info
const TrackInfo = React.memo(function TrackInfo({
  className,
}: {
  className?: string;
}) {
  const currentTrack = usePlaylist((state) => state.currentTrack);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {currentTrack?.catNo ? (
        <Link
          href={`/release/${currentTrack.catNo}`}
          className="flex items-center gap-2 hover:bg-accent/50 transition-colors rounded-md p-1.5"
        >
          <CoverImage />
          <ArtistInfo />
        </Link>
      ) : (
        <>
          <CoverImage />
          <ArtistInfo />
        </>
      )}
    </div>
  );
});

// MediaPlayerControls - static controls that don't need to update with time
const MediaPlayerControls = React.memo(function MediaPlayerControls() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-between">
      <TrackInfo className="col-span-1" />

      <MainControls className="col-span-1 justify-end sm:justify-center" />

      <div className="col-span-3 sm:col-span-1 flex items-center justify-between sm:justify-end gap-2">
        <VolumeControl />
        <PlaylistToggle />
      </div>
    </div>
  );
});

// Main MediaPlayer Component
export function MediaPlayer({ className }: { className?: string }) {
  return (
    <Card className={cn("p-2 space-y-1", className)}>
      <MediaPlayerControls />
      <TrackProgress />
    </Card>
  );
}
