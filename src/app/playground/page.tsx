"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { AnimatedText } from "@/components/animation/AnimatedText";
import { StaggerChildren } from "@/components/animation/StaggerChildren";
import { GlassmorphismCard } from "@/components/effects/GlassmorphismCard";
import { GradientText } from "@/components/effects/GradientText";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { Hotspot } from "@/components/interactive/Hotspot";
import { TouchReveal } from "@/components/interactive/TouchReveal";
import { DragDrop } from "@/components/interactive/DragDrop";
import { ParallaxContainer } from "@/components/parallax/ParallaxContainer";
import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ScrollProgress } from "@/components/scroll/ScrollProgress";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-24">
      <RevealOnScroll>
        <h2 className="mb-12 font-display text-3xl font-bold">{title}</h2>
      </RevealOnScroll>
      {children}
    </section>
  );
}

export default function PlaygroundPage() {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <ScrollProgress position="top" />
      <FloatingNav showAfter={200} position="top">
        <div className="flex items-center gap-6 px-6 py-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <span className="text-sm font-semibold">Component Playground</span>
        </div>
      </FloatingNav>

      <main className="mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <div className="mb-16">
          <AnimatedText animation="splitByWord" as="h1" className="mb-4 text-5xl font-black">
            Component Playground
          </AnimatedText>
          <AnimatedText animation="splitByWord" delay={0.3} className="text-lg text-muted-foreground">
            Explora todos los componentes del MD Design System
          </AnimatedText>
        </div>

        {/* Animated Text */}
        <Section title="AnimatedText">
          <div className="grid gap-8">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">splitByChar</p>
              <AnimatedText animation="splitByChar" as="h3" className="text-2xl font-bold">
                Cada letra se anima por separado
              </AnimatedText>
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">splitByWord</p>
              <AnimatedText animation="splitByWord" as="h3" className="text-2xl font-bold">
                Cada palabra aparece secuencialmente
              </AnimatedText>
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">typewriter</p>
              <AnimatedText animation="typewriter" as="p" className="text-lg">
                Este texto aparece como si se escribiera en tiempo real.
              </AnimatedText>
            </div>
          </div>
        </Section>

        {/* Reveal Animations */}
        <Section title="RevealOnScroll">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(["fadeUp", "fadeDown", "fadeLeft", "fadeRight", "scaleIn", "rotateIn"] as const).map(
              (anim, i) => (
                <RevealOnScroll key={anim} animation={anim} delay={i * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <p className="font-mono text-sm font-semibold">{anim}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Se anima al entrar al viewport
                    </p>
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </Section>

        {/* Stagger Children */}
        <Section title="StaggerChildren">
          <StaggerChildren animation="fadeUp" stagger={0.08} trigger="scroll">
            <div className="grid gap-4 sm:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-primary/10 p-6 text-center font-mono text-sm"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
          </StaggerChildren>
        </Section>

        {/* Gradient Text */}
        <Section title="GradientText">
          <div className="space-y-6">
            <GradientText
              from="hsl(213 51% 24%)"
              to="hsl(160 84% 39%)"
              as="h2"
              className="text-4xl font-black"
            >
              Deep Blue to Emerald
            </GradientText>
            <GradientText
              from="hsl(38 62% 58%)"
              via="hsl(0 84% 60%)"
              to="hsl(213 51% 24%)"
              animate
              as="h2"
              className="text-4xl font-black"
            >
              Animated Gradient Text
            </GradientText>
          </div>
        </Section>

        {/* Glassmorphism */}
        <Section title="GlassmorphismCard">
          <div
            className="relative flex items-center justify-center rounded-2xl p-16"
            style={{
              background:
                "linear-gradient(135deg, hsl(213 51% 24%), hsl(160 84% 39%), hsl(38 62% 58%))",
            }}
          >
            <GlassmorphismCard className="max-w-sm p-8">
              <h3 className="mb-2 text-xl font-bold text-white">Glassmorphism</h3>
              <p className="text-sm text-white/80">
                Tarjeta con efecto glass sobre fondo de gradiente. Blur, transparencia y borde sutil.
              </p>
            </GlassmorphismCard>
          </div>
        </Section>

        {/* Parallax */}
        <Section title="Parallax">
          <ParallaxContainer className="relative h-[50vh] overflow-hidden rounded-2xl bg-muted">
            <ParallaxLayer speed={0.2} className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-primary/20" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.5} className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-xl bg-secondary/30" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.8} className="absolute inset-0 flex items-center justify-center">
              <p className="font-display text-2xl font-bold">Capas con diferentes velocidades</p>
            </ParallaxLayer>
          </ParallaxContainer>
        </Section>

        {/* Interactive */}
        <Section title="Interactive Components">
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Hotspot */}
            <div className="relative h-64 rounded-xl bg-muted">
              <p className="p-4 text-sm text-muted-foreground">
                Hotspot — toca el punto pulsante
              </p>
              <Hotspot position={{ x: "50%", y: "50%" }} pulseIndicator>
                <div className="rounded-lg bg-card p-4 shadow-lg">
                  <p className="text-sm font-medium">Contenido revelado</p>
                </div>
              </Hotspot>
            </div>

            {/* Touch Reveal */}
            <div className="rounded-xl bg-muted p-8">
              <p className="mb-4 text-sm text-muted-foreground">
                TouchReveal — manten presionado
              </p>
              <TouchReveal holdDuration={600}>
                <div className="rounded-lg bg-accent/20 p-6 text-center">
                  <p className="text-lg font-bold text-accent">Revelado!</p>
                </div>
              </TouchReveal>
            </div>
          </div>
        </Section>

        {/* Drag & Drop */}
        <Section title="DragDrop">
          <div className="relative h-48 rounded-xl border border-dashed border-border bg-muted/50">
            <p className="p-4 text-sm text-muted-foreground">
              Arrastra el elemento — Posicion: ({Math.round(dragPosition.x)}, {Math.round(dragPosition.y)})
            </p>
            <DragDrop
              bounds="parent"
              onDragEnd={setDragPosition}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="cursor-grab rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg active:cursor-grabbing">
                Arrastra aqui
              </div>
            </DragDrop>
          </div>
        </Section>
      </main>
    </>
  );
}
