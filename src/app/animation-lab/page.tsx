"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { AnimatedText } from "@/components/animation/AnimatedText";
import { StaggerChildren } from "@/components/animation/StaggerChildren";
import { GradientText } from "@/components/effects/GradientText";
import { ScrollProgress } from "@/components/scroll/ScrollProgress";
import {
  motionFadeUp,
  motionScaleIn,
  motionSlideIn,
  motionSlideRight,
  motionStaggerContainer,
} from "@/lib/animation-presets";

function MotionPresetDemo({
  name,
  variants,
}: {
  name: string;
  variants: import("framer-motion").Variants;
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-sm font-semibold">{name}</p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted/80"
        >
          <RotateCcw className="h-3 w-3" />
          Replay
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="flex h-24 items-center justify-center rounded-lg bg-muted"
        >
          <div className="h-12 w-12 rounded-lg bg-primary" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GSAPPresetDemo({ name }: { name: string }) {
  const [key, setKey] = useState(0);

  return (
    <RevealOnScroll key={key} animation={name as "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleIn" | "rotateIn"} once={false}>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-sm font-semibold">gsap.{name}</p>
          <button
            onClick={() => setKey((k) => k + 1)}
            className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted/80"
          >
            <Play className="h-3 w-3" />
            Trigger
          </button>
        </div>
        <div className="flex h-24 items-center justify-center rounded-lg bg-muted">
          <div className="h-12 w-32 rounded-lg bg-accent" />
        </div>
      </div>
    </RevealOnScroll>
  );
}

export default function AnimationLabPage() {
  const [staggerKey, setStaggerKey] = useState(0);

  return (
    <>
      <ScrollProgress position="top" color="hsl(160 84% 39%)" />

      <main className="mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <div className="mb-4">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
        <AnimatedText animation="splitByWord" as="h1" className="mb-4 text-5xl font-black">
          Animation Lab
        </AnimatedText>
        <p className="mb-16 max-w-lg text-lg text-muted-foreground">
          Experimenta con los presets de animacion del design system. GSAP para scroll, Framer Motion para UI.
        </p>

        {/* Framer Motion Presets */}
        <section className="mb-24">
          <RevealOnScroll>
            <h2 className="mb-2 font-display text-3xl font-bold">Framer Motion Presets</h2>
            <p className="mb-8 text-muted-foreground">
              Variantes listas para usar con motion components
            </p>
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2">
            <MotionPresetDemo name="motionFadeUp" variants={motionFadeUp} />
            <MotionPresetDemo name="motionScaleIn" variants={motionScaleIn} />
            <MotionPresetDemo name="motionSlideIn" variants={motionSlideIn} />
            <MotionPresetDemo name="motionSlideRight" variants={motionSlideRight} />
          </div>
        </section>

        {/* GSAP Presets */}
        <section className="mb-24">
          <RevealOnScroll>
            <h2 className="mb-2 font-display text-3xl font-bold">GSAP ScrollTrigger Presets</h2>
            <p className="mb-8 text-muted-foreground">
              Se activan al hacer scroll — desplazate para ver cada uno
            </p>
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["fadeUp", "fadeDown", "fadeLeft", "fadeRight", "scaleIn", "rotateIn"].map(
              (name) => (
                <GSAPPresetDemo key={name} name={name} />
              )
            )}
          </div>
        </section>

        {/* Stagger Demo */}
        <section className="mb-24">
          <RevealOnScroll>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 font-display text-3xl font-bold">StaggerChildren</h2>
                <p className="text-muted-foreground">Animacion escalonada para listas y grids</p>
              </div>
              <button
                onClick={() => setStaggerKey((k) => k + 1)}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                Replay
              </button>
            </div>
          </RevealOnScroll>
          <StaggerChildren key={staggerKey} animation="fadeUp" stagger={0.06} trigger="mount">
            <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="flex h-20 items-center justify-center rounded-xl bg-secondary/15 font-mono text-sm font-semibold text-secondary"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </StaggerChildren>
        </section>

        {/* Motion Stagger Container */}
        <section className="mb-24">
          <RevealOnScroll>
            <h2 className="mb-2 font-display text-3xl font-bold">Motion Stagger Container</h2>
            <p className="mb-8 text-muted-foreground">
              Framer Motion staggerChildren con variantes padre/hijo
            </p>
          </RevealOnScroll>
          <motion.div
            variants={motionStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {["CuentosIA", "Palabras Vivas", "Landing Pages", "Dashboards", "Admin Panels", "APIs"].map(
              (project) => (
                <motion.div
                  key={project}
                  variants={motionFadeUp}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <h3 className="font-display text-lg font-bold">{project}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Usa MD Design System
                  </p>
                </motion.div>
              )
            )}
          </motion.div>
        </section>

        {/* Text Animation Showcase */}
        <section className="mb-24">
          <RevealOnScroll>
            <h2 className="mb-8 font-display text-3xl font-bold">Text Animations</h2>
          </RevealOnScroll>
          <div className="space-y-16">
            <div>
              <p className="mb-4 font-mono text-xs text-muted-foreground">
                GradientText + animate
              </p>
              <GradientText
                from="hsl(213 51% 24%)"
                via="hsl(160 84% 39%)"
                to="hsl(38 62% 58%)"
                animate
                as="h2"
                className="text-5xl font-black"
              >
                Gradiente animado infinito
              </GradientText>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs text-muted-foreground">
                AnimatedText highlight
              </p>
              <AnimatedText
                animation="highlight"
                as="h3"
                highlightColor="hsl(38 62% 58% / 0.3)"
                className="text-3xl font-bold"
              >
                Texto con efecto highlight progresivo
              </AnimatedText>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
