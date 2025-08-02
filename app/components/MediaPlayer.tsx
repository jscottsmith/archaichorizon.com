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

  const handleSeek = (value: number[]) => {
    if (audio.duration > 0) {
      const newTime = (value[0] / 100) * audio.duration;
      audio.seek(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    audio.setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressValue =
    audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <div className="p-4 space-y-4 bg-background border rounded-lg">
      {/* Track info */}
      {(playlist.currentTrack?.title || playlist.currentTrack?.artist) && (
        <div className="text-center">
          {playlist.currentTrack?.title && (
            <h3 className="font-semibold text-lg">
              {playlist.currentTrack.title}
            </h3>
          )}
          {playlist.currentTrack?.artist && (
            <p className="text-sm text-muted-foreground">
              {playlist.currentTrack.artist}
            </p>
          )}
          {playlist.totalTracks > 1 && (
            <p className="text-xs text-muted-foreground">
              Track {playlist.currentTrackIndex + 1} of {playlist.totalTracks}
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
          <span>{formatTime(audio.currentTime)}</span>
          <span>{formatTime(audio.duration)}</span>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-4">
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
            <Pause size={24} />
          ) : (
            <Play size={24} />
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

      {/* Volume controls */}
      <div className="flex items-center gap-2">
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
    </div>
  );
}
