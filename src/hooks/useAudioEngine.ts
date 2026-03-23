"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

interface PlayOptions {
  volume?: number;
  loop?: boolean;
  rate?: number;
}

export function useAudioEngine() {
  const howlsRef = useRef<Map<string, Howl>>(new Map());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);

  const getOrCreateHowl = useCallback(
    (src: string, options?: PlayOptions): Howl => {
      const existing = howlsRef.current.get(src);
      if (existing) return existing;

      const howl = new Howl({
        src: [src],
        volume: options?.volume ?? volume,
        loop: options?.loop ?? false,
        rate: options?.rate ?? 1,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });

      howlsRef.current.set(src, howl);
      return howl;
    },
    [volume]
  );

  const play = useCallback(
    (src: string, options?: PlayOptions) => {
      const howl = getOrCreateHowl(src, options);
      if (options?.volume !== undefined) howl.volume(options.volume);
      if (options?.loop !== undefined) howl.loop(options.loop);
      howl.play();
      return howl;
    },
    [getOrCreateHowl]
  );

  const pause = useCallback((src?: string) => {
    if (src) {
      howlsRef.current.get(src)?.pause();
    } else {
      howlsRef.current.forEach((h) => h.pause());
    }
  }, []);

  const stop = useCallback((src?: string) => {
    if (src) {
      howlsRef.current.get(src)?.stop();
    } else {
      howlsRef.current.forEach((h) => h.stop());
    }
  }, []);

  const setVolume = useCallback(
    (vol: number) => {
      const clamped = Math.max(0, Math.min(1, vol));
      setVolumeState(clamped);
      howlsRef.current.forEach((h) => h.volume(clamped));
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      howlsRef.current.forEach((h) => {
        h.stop();
        h.unload();
      });
      howlsRef.current.clear();
    };
  }, []);

  return { play, pause, stop, setVolume, isPlaying, volume };
}
