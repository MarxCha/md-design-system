"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";

interface WordTiming {
  start: number;
  end: number;
}

interface NarrationSyncProps {
  audioSrc: string;
  words: string[];
  timings: WordTiming[];
  className?: string;
  highlightColor?: string;
}

function useWordHighlight(timings: WordTiming[], isPlaying: boolean, getSeek: () => number) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    const seek = getSeek();
    const idx = timings.findIndex((t) => seek >= t.start && seek <= t.end);
    setActiveIndex(idx);
    rafRef.current = requestAnimationFrame(tick);
  }, [timings, getSeek]);

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, tick]);

  return activeIndex;
}

export function NarrationSync({
  audioSrc,
  words,
  timings,
  className,
  highlightColor = "rgba(255, 220, 60, 0.4)",
}: NarrationSyncProps) {
  const [playing, setPlaying] = useState(false);
  const howlRef = useRef<Howl | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const getSeek = useCallback((): number => {
    return (howlRef.current?.seek() as number) ?? 0;
  }, []);

  const activeIndex = useWordHighlight(timings, playing, getSeek);

  useEffect(() => {
    const h = new Howl({
      src: [audioSrc],
      html5: true,
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onend: () => setPlaying(false),
      onstop: () => setPlaying(false),
    });
    howlRef.current = h;
    return () => { h.unload(); };
  }, [audioSrc]);

  // Auto-scroll to active word
  useEffect(() => {
    if (activeIndex >= 0) {
      wordRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeIndex]);

  const toggle = () => {
    const h = howlRef.current;
    if (!h) return;
    if (playing) h.pause();
    else h.play();
  };

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause narration" : "Play narration"}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors shadow text-sm"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="1" y="0" width="3.5" height="12" rx="1" />
              <rect x="7.5" y="0" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <polygon points="2,0 12,6 2,12" />
            </svg>
          )}
        </button>
        <span className="text-xs text-white/50">Narration</span>
      </div>

      {/* Words */}
      <p className="text-base leading-relaxed">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            className="transition-all duration-100 rounded-sm px-0.5"
            style={
              i === activeIndex
                ? { backgroundColor: highlightColor, color: "#000" }
                : {}
            }
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
