import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs, gradients } from "./video-tokens";
import type { Slide, SlideLayout } from "../../docs-kit/types";
import { layoutThemes } from "../../docs-kit/theme-bridge";

export type PitchDeckProps = {
  /** Title shown on the intro */
  title: string;
  subtitle?: string;
  /** Slides to render */
  slides: Slide[];
  /** Visual layout */
  layout?: SlideLayout;
  /** Seconds per slide */
  slideDuration?: number;
  /** Seconds for intro */
  introDuration?: number;
};

// ─── Individual Slide Renderers ────────────────────────────────────────────

function TitleRenderer({ title, subtitle, colors }: {
  title: string; subtitle?: string; colors: ReturnType<typeof getColors>;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: springConfigs.snappy, durationInFrames: 25 });
  const subtitleOpacity = interpolate(frame, [15, 28], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{
        fontFamily: vt.fontFamily.display, fontSize: vt.fontSize["4xl"], fontWeight: vt.fontWeight.black,
        color: colors.fg, textAlign: "center", lineHeight: vt.lineHeight.tight, maxWidth: "85%",
        opacity: interpolate(titleProgress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontFamily: vt.fontFamily.body, fontSize: vt.fontSize.xl, color: colors.muted,
          marginTop: vs[4], opacity: subtitleOpacity, textAlign: "center", maxWidth: "70%",
        }}>
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
}

function ContentRenderer({ title, bullets, colors }: {
  title: string; bullets: string[]; colors: ReturnType<typeof getColors>;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", padding: 80 }}>
      <div style={{
        fontFamily: vt.fontFamily.display, fontSize: vt.fontSize["3xl"], fontWeight: vt.fontWeight.bold,
        color: colors.fg, marginBottom: vs[8],
      }}>
        {title}
      </div>
      {bullets.map((bullet, i) => {
        const delay = 8 + i * 6;
        const progress = spring({ frame: frame - delay, fps, config: springConfigs.snappy, durationInFrames: 20 });
        return (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: vs[3], marginBottom: vs[4],
            opacity: interpolate(progress, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(progress, [0, 1], [30, 0])}px)`,
          }}>
            <span style={{ color: colors.accent, fontSize: vt.fontSize.lg, marginTop: 4 }}>&#x25CF;</span>
            <span style={{
              fontFamily: vt.fontFamily.body, fontSize: vt.fontSize.lg, color: colors.muted,
              lineHeight: vt.lineHeight.normal,
            }}>
              {bullet}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function StatsRenderer({ title, stats, colors }: {
  title: string; stats: Array<{ value: string; label: string; delta?: string }>; colors: ReturnType<typeof getColors>;
}) {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{
        fontFamily: vt.fontFamily.display, fontSize: vt.fontSize["3xl"], fontWeight: vt.fontWeight.bold,
        color: colors.fg, marginBottom: vs[12], textAlign: "center",
      }}>
        {title}
      </div>
      <div style={{ display: "flex", gap: vs[6], justifyContent: "center" }}>
        {stats.map((stat, i) => {
          const delay = 10 + i * 8;
          const progress = spring({ frame: frame - delay, fps, config: springConfigs.bouncy, durationInFrames: 25 });
          const scale = interpolate(progress, [0, 1], [0.7, 1]);
          return (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: vs[6], borderRadius: vr.lg,
              border: `1px solid ${colors.accent}33`, minWidth: 200,
              opacity: interpolate(progress, [0, 1], [0, 1]),
              transform: `scale(${scale})`,
            }}>
              <span style={{
                fontFamily: vt.fontFamily.display, fontSize: vt.fontSize["4xl"],
                fontWeight: vt.fontWeight.black, color: colors.accent,
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily: vt.fontFamily.body, fontSize: vt.fontSize.md,
                color: colors.muted, marginTop: vs[2],
              }}>
                {stat.label}
              </span>
              {stat.delta && (
                <span style={{
                  fontFamily: vt.fontFamily.mono, fontSize: vt.fontSize.sm,
                  color: colors.accent, marginTop: vs[1], opacity: 0.8,
                }}>
                  {stat.delta}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function QuoteRenderer({ quote, author, role, colors }: {
  quote: string; author: string; role?: string; colors: ReturnType<typeof getColors>;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: springConfigs.smooth, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 100 }}>
      <div style={{
        width: 80, height: 3, backgroundColor: colors.accent, borderRadius: 2, marginBottom: vs[8],
        opacity: interpolate(progress, [0, 1], [0, 1]),
      }} />
      <div style={{
        fontFamily: vt.fontFamily.display, fontSize: vt.fontSize["2xl"], fontStyle: "italic",
        color: colors.fg, textAlign: "center", lineHeight: vt.lineHeight.relaxed, maxWidth: "80%",
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}>
        &ldquo;{quote}&rdquo;
      </div>
      <div style={{
        marginTop: vs[6], fontFamily: vt.fontFamily.body, fontSize: vt.fontSize.lg,
        fontWeight: vt.fontWeight.semibold, color: colors.fg,
        opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        {author}
      </div>
      {role && (
        <div style={{
          fontFamily: vt.fontFamily.body, fontSize: vt.fontSize.base,
          color: colors.muted, marginTop: vs[1],
          opacity: interpolate(frame, [25, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          {role}
        </div>
      )}
    </AbsoluteFill>
  );
}

function CTARenderer({ title, subtitle, colors }: {
  title: string; subtitle?: string; colors: ReturnType<typeof getColors>;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 5, fps, config: springConfigs.bouncy, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{
        width: 96, height: 4, backgroundColor: colors.accent, borderRadius: 2, marginBottom: vs[8],
      }} />
      <div style={{
        fontFamily: vt.fontFamily.display, fontSize: vt.fontSize["4xl"], fontWeight: vt.fontWeight.black,
        color: colors.fg, textAlign: "center", maxWidth: "80%",
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontFamily: vt.fontFamily.body, fontSize: vt.fontSize.xl,
          color: colors.muted, marginTop: vs[4], textAlign: "center",
          opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
}

// ─── Color Helpers ─────────────────────────────────────────────────────────

function getColors(layout: SlideLayout) {
  const overrides = layoutThemes[layout];
  return {
    bg: overrides.background ?? vc.primary900,
    fg: overrides.foreground ?? vc.white,
    accent: overrides.primary ?? vc.accent,
    muted: overrides.mutedForeground ?? vc.primary200,
  };
}

// ─── Slide Router ──────────────────────────────────────────────────────────

function renderSlide(slide: Slide, colors: ReturnType<typeof getColors>) {
  switch (slide.type) {
    case "title":
      return <TitleRenderer title={slide.title} subtitle={slide.subtitle} colors={colors} />;
    case "content":
      return <ContentRenderer title={slide.title} bullets={slide.bullets} colors={colors} />;
    case "stats":
      return <StatsRenderer title={slide.title} stats={slide.stats} colors={colors} />;
    case "quote":
      return <QuoteRenderer quote={slide.quote} author={slide.author} role={slide.role} colors={colors} />;
    case "cta":
      return <CTARenderer title={slide.title} subtitle={slide.subtitle} colors={colors} />;
    case "image":
      return (
        <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
          <img src={slide.src} alt={slide.alt} style={{ maxWidth: "90%", maxHeight: "85%", objectFit: "contain", borderRadius: vr.lg }} />
        </AbsoluteFill>
      );
    default:
      return <AbsoluteFill style={{ backgroundColor: colors.bg }} />;
  }
}

// ─── Main Composition ──────────────────────────────────────────────────────

export const PitchDeck: React.FC<PitchDeckProps> = ({
  title,
  subtitle,
  slides,
  layout = "dark-tech",
  slideDuration = 5,
  introDuration = 4,
}) => {
  const { fps } = useVideoConfig();
  const colors = getColors(layout);
  const introFrames = Math.round(introDuration * fps);
  const slideFrames = Math.round(slideDuration * fps);

  return (
    <AbsoluteFill>
      {/* Intro */}
      <Sequence from={0} durationInFrames={introFrames} name="Intro">
        <TitleRenderer title={title} subtitle={subtitle} colors={colors} />
      </Sequence>

      {/* Slides */}
      {slides.map((slide, i) => (
        <Sequence
          key={slide.id}
          from={introFrames + i * slideFrames}
          durationInFrames={slideFrames}
          name={`Slide-${slide.id}`}
        >
          {renderSlide(slide, colors)}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** Calculate total frames */
export function calculatePitchDeckDuration(
  props: PitchDeckProps,
  fps: number = 30
): number {
  const intro = Math.round((props.introDuration ?? 4) * fps);
  const slides = props.slides.length * Math.round((props.slideDuration ?? 5) * fps);
  return intro + slides;
}
