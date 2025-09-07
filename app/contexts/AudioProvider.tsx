"use client";

import React, { useRef, useEffect } from "react";
import { usePlaylist } from "../stores/playlistStore";
import {
  useAudio as useAudioStore,
  cleanupAudioStore,
} from "@/app/stores/audioStore";
import { ids } from "../constants/ids";
import {
  AudioTrackTitle,
  AudioTrackArtist,
  AudioTrackAlbum,
  AudioTrackCurrentTrackNumber,
  AudioTrackTotalsTracks,
} from "../components/MediaPlayer/LabeledElements";

export function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current track from playlist store
  const nextTrack = usePlaylist((state) => state.nextTrack);
  const currentTrack = usePlaylist((state) => state.currentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);

  // Get audio store actions and state
  const { setAudioRef, isPlaying, resetForNewTrack } = useAudioStore();

  // Set up audio element ref
  useEffect(() => {
    setAudioRef(audioRef.current);

    // Sync persisted state with audio element when it's available
    if (audioRef.current) {
      const { volume, isMuted } = useAudioStore.getState();
      audioRef.current.volume = isMuted ? 0 : volume;
    }

    // Cleanup on unmount
    return () => {
      cleanupAudioStore();
      setAudioRef(null);
    };
  }, [setAudioRef]);

  // Sync audio with playlist track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    // Only set src if it's a different track
    if (audio.src !== currentTrack.media.mp3.url) {
      const wasPlaying = isPlaying;
      audio.src = currentTrack.media.mp3.url;
      resetForNewTrack();

      // If it was playing before, keep the isPlaying state true
      // The canplay event will handle resuming playback
      if (wasPlaying) {
        useAudioStore.getState().setIsPlaying(true);
      }
    }
  }, [
    currentTrack?.url,
    currentTrack?.media.mp3.url,
    isPlaying,
    nextTrack,
    resetForNewTrack,
  ]);

  // Handle track ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      useAudioStore.getState().setIsPlaying(false);
      useAudioStore.getState().setCurrentTime(0);
      nextTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextTrack]);

  return (
    <figure className="sr-only">
      <audio
        id={ids.mediaPlayerAudioElement}
        ref={audioRef}
        preload="metadata"
        autoPlay
        crossOrigin="anonymous"
        data-title={currentTrack?.title}
        data-artist={currentTrack?.artist}
        data-album={currentTrack?.album}
        data-cover={currentTrack?.images?.cover}
      />
      <figcaption>
        <h2>Now Playing</h2>
        {currentTrack?.images?.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentTrack.images.cover}
            alt={`Cover art for ${currentTrack.title}`}
            width={100}
          />
        )}
        <p>
          <span>Title: </span>
          <AudioTrackTitle enableId={false}>
            {currentTrack?.title}
          </AudioTrackTitle>
        </p>
        <p>
          <AudioTrackCurrentTrackNumber enableId={false}>
            {currentTrackIndex + 1}
          </AudioTrackCurrentTrackNumber>{" "}
          of{" "}
          <AudioTrackTotalsTracks enableId={false}>
            {totalTracks}
          </AudioTrackTotalsTracks>
        </p>
        <p>
          <span>Artist: </span>
          <AudioTrackArtist enableId={false}>
            {currentTrack?.artist}
          </AudioTrackArtist>
        </p>
        <p>
          <span>Album: </span>
          <AudioTrackAlbum enableId={false}>
            {currentTrack?.album}
          </AudioTrackAlbum>
        </p>
      </figcaption>
    </figure>
  );
}
