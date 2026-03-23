"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { Howl } from "howler";

interface SoundscapeContextValue {
  playSFX: (src: string, volume?: number) => void;
  ready: boolean;
}

const SoundscapeContext = createContext<SoundscapeContextValue>({
  playSFX: () => undefined,
  ready: false,
});

export function useSoundscape() {
  return useContext(SoundscapeContext);
}

interface SoundscapeProviderProps {
  children: React.ReactNode;
  ambientSrc?: string;
  volume?: number;
  fadeIn?: number;
}

export function SoundscapeProvider({
  children,
  ambientSrc,
  volume = 0.3,
  fadeIn = 1500,
}: SoundscapeProviderProps) {
  const ambientRef = useRef<Howl | null>(null);
  const [ready, setReady] = useState(false);
  const sfxCache = useRef<Map<string, Howl>>(new Map());

  // Bootstrap ambient after first user interaction
  const bootstrap = useCallback(() => {
    if (ambientRef.current || !ambientSrc) {
      setReady(true);
      return;
    }
    const h = new Howl({
      src: [ambientSrc],
      loop: true,
      volume: 0,
      html5: true,
      onload: () => {
        h.play();
        h.fade(0, volume, fadeIn);
        setReady(true);
      },
    });
    ambientRef.current = h;
  }, [ambientSrc, volume, fadeIn]);

  useEffect(() => {
    const events: (keyof DocumentEventMap)[] = ["click", "touchstart", "keydown"];
    const handler = () => {
      bootstrap();
      events.forEach((ev) => document.removeEventListener(ev, handler));
    };
    events.forEach((ev) => document.addEventListener(ev, handler, { once: true }));
    return () => events.forEach((ev) => document.removeEventListener(ev, handler));
  }, [bootstrap]);

  // Pause / resume on visibility change
  useEffect(() => {
    const handleVisibility = () => {
      const h = ambientRef.current;
      if (!h) return;
      if (document.hidden) {
        h.fade(volume, 0, 400);
        setTimeout(() => h.pause(), 400);
      } else {
        h.play();
        h.fade(0, volume, 600);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ambientRef.current?.unload();
      sfxCache.current.forEach((h) => h.unload());
    };
  }, []);

  const playSFX = useCallback((src: string, sfxVolume = 0.6) => {
    let h = sfxCache.current.get(src);
    if (!h) {
      h = new Howl({ src: [src], volume: sfxVolume, html5: true });
      sfxCache.current.set(src, h);
    } else {
      h.volume(sfxVolume);
    }
    h.play();
  }, []);

  return (
    <SoundscapeContext.Provider value={{ playSFX, ready }}>
      {children}
    </SoundscapeContext.Provider>
  );
}
