"use client";

import React, { useRef, useEffect } from "react";
import { usePlaylist, selectCurrentTrack } from "../stores/playlistStore";
import {
  useAudio as useAudioStore,
} from "@/app/stores/audioStore";
import { ids } from "../constants/ids";
import {
  AudioTrackTitle,
  AudioTrackArtist,
  AudioTrackAlbum,
  AudioTrackCurrentTrackNumber,
  AudioTrackTotalsTracks,
} from "../components/MediaPlayer/LabeledElements";

function normalizeAudioUrl(url: string) {
  if (!url) {
    return "";
  }

  try {
    return new URL(url, window.location.href).href;
  } catch {
    return url;
  }
}

export function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current track from playlist store
  const nextTrack = usePlaylist((state) => state.nextTrack);
  const currentTrack = usePlaylist(selectCurrentTrack);
  const totalTracks = usePlaylist((state) => state.tracks.length);
  const currentTrackIndex = usePlaylist((state) => state.currentTrackIndex);

  // Get audio store actions and state
  const setAudioRef = useAudioStore((state) => state.setAudioRef);
  const resetForNewTrack = useAudioStore((state) => state.resetForNewTrack);

  useEffect(() => {
    setAudioRef(audioRef.current);

    void Promise.resolve(useAudioStore.persist.rehydrate()).then(() => {
      if (audioRef.current) {
        const { volume, isMuted } = useAudioStore.getState();
        audioRef.current.volume = isMuted ? 0 : volume;
      }
    });
  }, [setAudioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    const sourceUrl = currentTrack?.url;
    if (!audio || !sourceUrl) return;

    if (normalizeAudioUrl(audio.src) === normalizeAudioUrl(sourceUrl)) {
      return;
    }

    const wasPlaying = useAudioStore.getState().isPlaying;
    audio.src = sourceUrl;
    resetForNewTrack();

    if (wasPlaying) {
      useAudioStore.getState().setIsPlaying(true);
    }
  }, [currentTrack?.url, resetForNewTrack]);
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
      {/* Music player has no captions track by design */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
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
          // oxlint-disable-next-line nextjs/no-img-element
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
