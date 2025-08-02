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
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

export function MediaPlayer() {
  const {
    nextTrack,
    previousTrack,
    currentTrack,
    currentTrackIndex,
    totalTracks,
  } = usePlaylist();

  const {
    play: audioPlay,
    pause: audioPause,
    seek,
    setVolume,
    toggleMute,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
  } = useAudio();

  const handlePlay = async () => {
    await audioPlay();
  };

  const handlePause = () => {
    audioPause();
  };

  const handleNext = () => {
    nextTrack();
  };

  const handlePrevious = () => {
    previousTrack();
  };

  const handleSeek = (value: number[]) => {
    if (duration > 0) {
      const newTime = (value[0] / 100) * duration;
      seek(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="p-4 space-y-4 bg-background border rounded-lg">
      {/* Track info */}
      {(currentTrack?.title || currentTrack?.artist) && (
        <div className="text-center">
          {currentTrack?.title && (
            <h3 className="font-semibold text-lg">{currentTrack.title}</h3>
          )}
          {currentTrack?.artist && (
            <p className="text-sm text-muted-foreground">
              {currentTrack.artist}
            </p>
          )}
          {totalTracks > 1 && (
            <p className="text-xs text-muted-foreground">
              Track {currentTrackIndex + 1} of {totalTracks}
            </p>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className="space-y-2">
        <Slider
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

      {/* Main controls */}
      <div className="flex items-center justify-center gap-4">
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
            <Pause size={24} />
          ) : (
            <Play size={24} />
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

      {/* Volume controls */}
      <div className="flex items-center gap-2">
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
    </div>
  );
}
