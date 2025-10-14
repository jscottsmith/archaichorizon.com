import { useEffect, useRef } from "react";
import { useAudio } from "../stores/audioStore";

// Simple audio analyzer hook that returns a function to get frequency data
export function useAudioAnalyzer() {
  const audioRef = useAudio((state) => state.audioRef);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioRef) {
      console.warn("No audio ref available");
      return;
    }

    try {
      // Create audio context
      const audioContext = new (window.AudioContext ||
        (window as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;

      // Store analyser in ref
      analyserRef.current = analyser;

      // Create source from audio element
      // Note: This can only be called once per audio element
      const source = audioContext.createMediaElementSource(audioRef);

      // Connect: source -> analyser -> destination
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Start audio context if suspended
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      console.log("Audio analyzer setup complete");

      // Cleanup
      return () => {
        analyserRef.current = null;
        source.disconnect();
        analyser.disconnect();
        audioContext.close();
      };
    } catch (error) {
      console.error("Failed to setup audio analyzer:", error);
      // If MediaElementSource already exists, we can't create another one
      // The component should be restructured to only call this hook once
    }
  }, [audioRef]);

  // Return a function that gets the latest frequency data
  const getFrequencyData = (): Float32Array => {
    if (!analyserRef.current) {
      return new Float32Array(64).fill(0);
    }

    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);

    // Convert to Float32Array and normalize (0-1)
    const floatData = new Float32Array(data.length);
    for (let i = 0; i < data.length; i++) {
      floatData[i] = data[i] / 255;
    }

    return floatData;
  };

  return { getFrequencyData, analyserRef };
}
