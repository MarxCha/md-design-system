"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Howl, Howler } from "howler";

/* ============================================================
   Types
   ============================================================ */
export type AudioTrackId = string;

export interface AudioTrack {
  id: AudioTrackId;
  src: string | string[];
  volume?: number;
  loop?: boolean;
  /** true = background music, false/undefined = one-shot SFX */
  isMusic?: boolean;
}

interface AudioContextValue {
  play: (id: AudioTrackId) => void;
  pause: (id?: AudioTrackId) => void;
  stop: (id?: AudioTrackId) => void;
  setVolume: (volume: number, id?: AudioTrackId) => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  register: (track: AudioTrack) => void;
  unregister: (id: AudioTrackId) => void;
}

/* ============================================================
   Context
   ============================================================ */
const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

/* ============================================================
   Provider
   ============================================================ */
interface AudioProviderProps {
  children: ReactNode;
  /** Pre-register tracks at mount time */
  tracks?: AudioTrack[];
  /** Initial master volume 0-1 (default 0.8) */
  masterVolume?: number;
  /** Start muted (default false) */
  startMuted?: boolean;
}

export function AudioProvider({
  children,
  tracks = [],
  masterVolume = 0.8,
  startMuted = false,
}: AudioProviderProps) {
  const howlsRef = useRef<Map<AudioTrackId, Howl>>(new Map());
  const [isMuted, setIsMuted] = useState(startMuted);

  // Apply master volume and mute state on init
  useEffect(() => {
    Howler.volume(masterVolume);
    Howler.mute(startMuted);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Register pre-declared tracks on mount
  useEffect(() => {
    tracks.forEach((track) => registerTrack(track));
    const howls = howlsRef.current;
    return () => {
      // Destroy all howls on unmount
      howls.forEach((h) => h.unload());
      howls.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- Helpers ---------- */
  const registerTrack = useCallback((track: AudioTrack) => {
    if (howlsRef.current.has(track.id)) return;
    const howl = new Howl({
      src: Array.isArray(track.src) ? track.src : [track.src],
      volume: track.volume ?? 1,
      loop: track.loop ?? false,
      preload: true,
    });
    howlsRef.current.set(track.id, howl);
  }, []);

  const getHowl = useCallback(
    (id: AudioTrackId): Howl | undefined => howlsRef.current.get(id),
    []
  );

  /* ---------- API ---------- */
  const play = useCallback(
    (id: AudioTrackId) => {
      const howl = getHowl(id);
      if (!howl) {
        console.warn(`[AudioProvider] Track "${id}" is not registered.`);
        return;
      }
      howl.play();
    },
    [getHowl]
  );

  const pause = useCallback(
    (id?: AudioTrackId) => {
      if (id) {
        getHowl(id)?.pause();
      } else {
        howlsRef.current.forEach((h) => h.pause());
      }
    },
    [getHowl]
  );

  const stop = useCallback(
    (id?: AudioTrackId) => {
      if (id) {
        getHowl(id)?.stop();
      } else {
        howlsRef.current.forEach((h) => h.stop());
      }
    },
    [getHowl]
  );

  const setVolume = useCallback(
    (volume: number, id?: AudioTrackId) => {
      const clamped = Math.max(0, Math.min(1, volume));
      if (id) {
        getHowl(id)?.volume(clamped);
      } else {
        Howler.volume(clamped);
      }
    },
    [getHowl]
  );

  const mute = useCallback(() => {
    Howler.mute(true);
    setIsMuted(true);
  }, []);

  const unmute = useCallback(() => {
    Howler.mute(false);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) unmute();
    else mute();
  }, [isMuted, mute, unmute]);

  const register = useCallback(
    (track: AudioTrack) => registerTrack(track),
    [registerTrack]
  );

  const unregister = useCallback((id: AudioTrackId) => {
    const howl = howlsRef.current.get(id);
    if (howl) {
      howl.unload();
      howlsRef.current.delete(id);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        play,
        pause,
        stop,
        setVolume,
        mute,
        unmute,
        toggleMute,
        isMuted,
        register,
        unregister,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
