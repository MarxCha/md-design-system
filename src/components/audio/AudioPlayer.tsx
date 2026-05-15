"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
  showWaveform?: boolean;
  className?: string;
}

function useAudioEngine(src: string, autoPlay: boolean) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    const h = howlRef.current;
    if (!h) return;
    const seek = h.seek() as number;
    const dur = h.duration();
    setProgress(dur > 0 ? seek / dur : 0);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const h = new Howl({
      src: [src],
      html5: true,
      volume,
      autoplay: autoPlay,
      onplay: () => {
        setPlaying(true);
        rafRef.current = requestAnimationFrame(tick);
      },
      onpause: () => {
        setPlaying(false);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      },
      onstop: () => {
        setPlaying(false);
        setProgress(0);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      },
      onend: () => {
        setPlaying(false);
        setProgress(0);
      },
      onload: () => setDuration(h.duration()),
    });
    howlRef.current = h;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      h.unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const toggle = useCallback(() => {
    const h = howlRef.current;
    if (!h) return;
    if (playing) h.pause();
    else h.play();
  }, [playing]);

  const seek = useCallback((ratio: number) => {
    const h = howlRef.current;
    if (!h) return;
    h.seek(ratio * h.duration());
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    howlRef.current?.volume(v);
  }, []);

  return { playing, progress, duration, volume, toggle, seek, changeVolume };
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  src,
  title,
  autoPlay = false,
  showWaveform = false,
  className,
}: AudioPlayerProps) {
  const { playing, progress, duration, volume, toggle, seek, changeVolume } =
    useAudioEngine(src, autoPlay);

  const elapsed = duration * progress;

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl bg-white/5 border border-white/10 p-4 shadow-lg backdrop-blur-sm ${className ?? ""}`}
    >
      {/* Title */}
      {title && (
        <p className="text-sm font-semibold truncate text-white/90">{title}</p>
      )}

      {/* Waveform placeholder */}
      {showWaveform && (
        <div className="flex items-end gap-0.5 h-8" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-sm bg-white/30"
              animate={
                playing
                  ? {
                      scaleY: [0.3, Math.random() * 0.7 + 0.3, 0.3],
                      transition: {
                        duration: 0.6 + Math.random() * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.02,
                      },
                    }
                  : { scaleY: 0.15 }
              }
              style={{ originY: 1, height: "100%" }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="relative h-1.5 w-full rounded-full bg-white/10 cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          seek((e.clientX - rect.left) / rect.width);
        }}
      >
        <div
          className="h-full rounded-full bg-white/80 transition-all"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
          style={{ left: `${progress * 100}%` }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-4">
        {/* Play/Pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors shadow"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="3,1 13,7 3,13" />
            </svg>
          )}
        </button>

        {/* Time */}
        <span className="text-xs tabular-nums text-white/60 min-w-[72px]">
          {formatTime(elapsed)} / {formatTime(duration)}
        </span>

        {/* Volume */}
        <div className="flex items-center gap-2 ml-auto">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-white/50 flex-shrink-0">
            <path d="M2 5h2l3-3v10L4 9H2a1 1 0 01-1-1V6a1 1 0 011-1zm9-1a5 5 0 010 8M9 5.5a3 3 0 010 5" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            aria-label="Volume"
            className="w-16 accent-white h-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
