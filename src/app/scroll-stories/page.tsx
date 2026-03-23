"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollStoryContainer } from "@/components/scroll/ScrollStoryContainer";
import { ScrollScene } from "@/components/scroll/ScrollScene";
import { AnimatedText } from "@/components/animation/AnimatedText";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { GradientText } from "@/components/effects/GradientText";
import { FloatingNav } from "@/components/navigation/FloatingNav";

export default function ScrollStoriesPage() {
  return (
    <>
      <FloatingNav showAfter={100} position="top">
        <div className="flex items-center gap-6 px-6 py-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <span className="text-sm font-semibold">Scroll Stories</span>
        </div>
      </FloatingNav>

      <ScrollStoryContainer
        showProgress
        onSceneChange={(index) => {
          console.log("Scene:", index);
        }}
      >
        {/* Scene 1: Intro */}
        <ScrollScene height="100vh" pin>
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="relative">
              <ParallaxLayer speed={0.3} className="absolute -left-32 -top-16 h-64 w-64 rounded-full bg-primary/5" />
              <ParallaxLayer speed={0.6} className="absolute -right-24 -bottom-12 h-48 w-48 rounded-full bg-secondary/10" />
              <div className="relative z-10">
                <AnimatedText animation="splitByWord" as="h1" className="mb-6 text-5xl font-black sm:text-7xl">
                  Scroll Storytelling
                </AnimatedText>
                <AnimatedText
                  animation="splitByWord"
                  delay={0.5}
                  className="mx-auto max-w-md text-lg text-muted-foreground"
                >
                  Una experiencia narrativa impulsada por scroll, como My Little Storybook y The Boat
                </AnimatedText>
              </div>
            </div>
            <RevealOnScroll animation="fadeUp" delay={1}>
              <div className="mt-16 animate-bounce text-muted-foreground">
                <svg className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <p className="mt-2 text-xs">Scroll para explorar</p>
              </div>
            </RevealOnScroll>
          </div>
        </ScrollScene>

        {/* Scene 2: The Problem */}
        <ScrollScene height="150vh">
          <div className="flex h-full flex-col items-center justify-center px-6">
            <div className="mx-auto max-w-2xl">
              <RevealOnScroll animation="fadeUp">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">
                  El Problema
                </p>
              </RevealOnScroll>
              <RevealOnScroll animation="fadeUp" delay={0.2}>
                <h2 className="mb-8 font-display text-4xl font-black sm:text-5xl">
                  Los proyectos de{" "}
                  <GradientText from="hsl(213 51% 24%)" to="hsl(160 84% 39%)">
                    MD Consultoria
                  </GradientText>{" "}
                  necesitan un lenguaje visual compartido
                </h2>
              </RevealOnScroll>
              <RevealOnScroll animation="fadeUp" delay={0.4}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  CuentosIA, Palabras Vivas, dashboards, landing pages — cada proyecto
                  reinventaba la rueda. Componentes duplicados, estilos inconsistentes,
                  animaciones ad-hoc. Era hora de unificar.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </ScrollScene>

        {/* Scene 3: The Solution */}
        <ScrollScene height="150vh">
          <div className="flex h-full flex-col items-center justify-center px-6">
            <div className="mx-auto max-w-3xl">
              <RevealOnScroll animation="scaleIn">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                  La Solucion
                </p>
              </RevealOnScroll>
              <RevealOnScroll animation="fadeUp" delay={0.2}>
                <h2 className="mb-12 font-display text-4xl font-black sm:text-5xl">
                  Un design system hecho para{" "}
                  <GradientText from="hsl(38 62% 58%)" to="hsl(0 84% 60%)">
                    contar historias
                  </GradientText>
                </h2>
              </RevealOnScroll>

              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    title: "Scroll Narrativo",
                    desc: "GSAP + Lenis para experiencias tipo My Little Storybook",
                    color: "bg-primary/10 text-primary",
                  },
                  {
                    title: "Parallax Inmersivo",
                    desc: "Capas con diferentes velocidades para profundidad visual",
                    color: "bg-secondary/10 text-secondary",
                  },
                  {
                    title: "Audio Sincronizado",
                    desc: "Howler.js + word-by-word sync para narracion interactiva",
                    color: "bg-accent/10 text-accent",
                  },
                ].map((item, i) => (
                  <RevealOnScroll key={item.title} animation="fadeUp" delay={0.3 + i * 0.15}>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                      <div className={`mb-3 inline-block rounded-lg ${item.color} px-3 py-1 text-xs font-semibold`}>
                        {item.title}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </ScrollScene>

        {/* Scene 4: Finale */}
        <ScrollScene height="100vh" pin>
          <div
            className="flex h-full flex-col items-center justify-center px-6 text-center"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(213 51% 24% / 0.05) 0%, transparent 70%)",
            }}
          >
            <RevealOnScroll animation="scaleIn">
              <GradientText
                from="hsl(213 51% 24%)"
                via="hsl(160 84% 39%)"
                to="hsl(38 62% 58%)"
                as="h2"
                animate
                className="mb-6 text-5xl font-black sm:text-7xl"
              >
                Construyendo el futuro
              </GradientText>
            </RevealOnScroll>
            <RevealOnScroll animation="fadeUp" delay={0.3}>
              <p className="mx-auto max-w-md text-lg text-muted-foreground">
                MD Design System — la base compartida para todos nuestros proyectos.
              </p>
            </RevealOnScroll>
            <RevealOnScroll animation="fadeUp" delay={0.6}>
              <Link
                href="/playground"
                className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explorar Componentes
              </Link>
            </RevealOnScroll>
          </div>
        </ScrollScene>
      </ScrollStoryContainer>
    </>
  );
}
