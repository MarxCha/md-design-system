"use client";

import { useMemo } from "react";

interface WordTiming {
  start: number;
  end: number;
}

interface HighlightedWord {
  word: string;
  isActive: boolean;
  isPast: boolean;
}

interface UseWordHighlightProps {
  words: string[];
  timings: WordTiming[];
  currentTime: number;
}

export function useWordHighlight({
  words,
  timings,
  currentTime,
}: UseWordHighlightProps) {
  const activeWordIndex = useMemo(() => {
    for (let i = timings.length - 1; i >= 0; i--) {
      if (currentTime >= timings[i].start && currentTime <= timings[i].end) {
        return i;
      }
    }
    // If between words, find closest upcoming
    for (let i = 0; i < timings.length; i++) {
      if (currentTime < timings[i].start) {
        return i > 0 ? i - 1 : -1;
      }
    }
    return timings.length - 1;
  }, [timings, currentTime]);

  const highlightedWords: HighlightedWord[] = useMemo(() => {
    return words.map((word, index) => {
      const timing = timings[index];
      if (!timing) {
        return { word, isActive: false, isPast: false };
      }
      return {
        word,
        isActive:
          currentTime >= timing.start && currentTime <= timing.end,
        isPast: currentTime > timing.end,
      };
    });
  }, [words, timings, currentTime]);

  return { activeWordIndex, highlightedWords };
}
