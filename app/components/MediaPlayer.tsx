"use client";

import { usePlaylist } from "../contexts/PlaylistProvider";
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useState, useRef, useEffect } from "react";

interface MediaPlayerProps {
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function MediaPlayer({
  onPlay,
  onPause,
  onEnded,
  onNext,
  onPrevious,
}: MediaPlayerProps) {
  const {
    play,
    pause,
    nextTrack,
    previousTrack,
    isPlaying,
    currentTrack,
    currentTrackIndex,
    totalTracks,
  } = usePlaylist();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Update current time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      onEnded?.();
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  // Sync audio with playlist state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    audio.src = currentTrack.url;
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  const handlePlay = () => {
    audioRef.current?.play().catch(console.error);
    play();
    onPlay?.();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    pause();
    onPause?.();
  };

  const handleNext = () => {
    nextTrack();
    onNext?.();
  };

  const handlePrevious = () => {
    previousTrack();
    onPrevious?.();
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="p-4 space-y-4 bg-background border rounded-lg">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
      />

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
          disabled={!currentTrack?.url}
          className="h-12 w-12"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
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
