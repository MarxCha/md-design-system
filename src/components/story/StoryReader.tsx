"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { SceneView } from "@/components/story/SceneView";

interface Scene {
  content: React.ReactNode;
  background?: string;
  audio?: string;
}

interface StoryReaderProps {
  scenes: Scene[];
  onComplete?: () => void;
  className?: string;
}

export function StoryReader({ scenes, onComplete, className }: StoryReaderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const audioRef = useRef<Howl | null>(null);

  const currentScene = scenes[currentIdx];
  const isLast = currentIdx === scenes.length - 1;

  useEffect(() => {
    audioRef.current?.stop();
    audioRef.current?.unload();

    if (currentScene?.audio) {
      const h = new Howl({
        src: [currentScene.audio],
        html5: true,
        volume: 0.7,
        onloaderror: () => console.warn("StoryReader: audio load error"),
      });
      h.play();
      audioRef.current = h;
    }

    return () => {
      audioRef.current?.stop();
    };
  }, [currentIdx, currentScene]);

  const goNext = () => {
    if (isLast) {
      setCompleted(true);
      onComplete?.();
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));

  if (completed) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6 ${className ?? ""}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold mb-2">Story Complete</p>
          <p className="text-white/50 text-sm">You have reached the end.</p>
        </motion.div>
        <button
          type="button"
          onClick={() => { setCurrentIdx(0); setCompleted(false); }}
          className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
        >
          Read Again
        </button>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SceneView background={currentScene?.background} overlay="dark">
            <div className="max-w-2xl mx-auto px-6 py-12">
              {currentScene?.content}
            </div>
          </SceneView>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIdx === 0}
          aria-label="Previous scene"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M10 3L5 8l5 5"/></svg>
        </button>

        <span className="text-white/60 text-xs tabular-nums">
          {currentIdx + 1} / {scenes.length}
        </span>

        <button
          type="button"
          onClick={goNext}
          aria-label={isLast ? "Complete story" : "Next scene"}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M6 3l5 5-5 5"/></svg>
        </button>
      </div>
    </div>
  );
}
