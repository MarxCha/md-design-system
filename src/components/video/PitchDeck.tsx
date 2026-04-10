import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";
import { GradientBackground } from "../../remotion/components/GradientBackground";
import { ProgressBar } from "../../remotion/components/ProgressBar";
import type { Slide, SlideLayout } from "../../docs-kit/types";
import { layoutThemes } from "../../docs-kit/theme-bridge";

export type PitchDeckProps = {
  title: string;
  subtitle?: string;
  slides: Slide[];
  layout?: SlideLayout;
  slideDuration?: number;
  introDuration?: number;
};

// ─── Animated Counter for Stats ─────────────────────────────────────────────

function AnimatedCounter({
  value,
  color,
  fontSize,
}: {
  value: string;
  color: string;
  fontSize: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numMatch = value.match(/(\d+\.?\d*)/);
  const numericValue = numMatch ? parseFloat(numMatch[1]) : 0;
  const prefix = value.slice(0, value.indexOf(numMatch?.[0] ?? ""));
  const suffix = value.slice(
    value.indexOf(numMatch?.[0] ?? "") + (numMatch?.[0]?.length ?? 0),
  );

  const countProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
    durationInFrames: 40,
  });

  const displayNum =
    numericValue % 1 === 0
      ? Math.round(numericValue * countProgress)
      : (numericValue * countProgress).toFixed(1);

  return (
    <span
      style={{
        fontFamily: vt.fontFamily.display,
        fontSize,
        fontWeight: vt.fontWeight.black,
        color,
      }}
    >
      {prefix}
      {displayNum}
      {suffix}
    </span>
  );
}

// ─── Slide Renderers ──────────────────────────────────────────────────────

function TitleRenderer({
  title,
  subtitle,
  colors,
}: {
  title: string;
  subtitle?: string;
  colors: Colors;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: springConfigs.snappy,
    durationInFrames: 25,
  });

  // Title: blur + slideUp entrance
  const titleBlur = interpolate(frame, [0, 15], [8, 0], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [15, 28], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <GradientBackground
        colors={[colors.bg, `${colors.accent}11`, colors.bg]}
        type="radial"
      />
      <div
        style={{
          fontFamily: vt.fontFamily.display,
          fontSize: vt.fontSize["4xl"],
          fontWeight: vt.fontWeight.black,
          color: colors.fg,
          textAlign: "center",
          lineHeight: vt.lineHeight.tight,
          maxWidth: "85%",
          opacity: interpolate(titleProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
          filter: `blur(${titleBlur}px)`,
          position: "relative",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: vt.fontFamily.body,
            fontSize: vt.fontSize.xl,
            color: colors.muted,
            marginTop: vs[4],
            opacity: subtitleOpacity,
            textAlign: "center",
            maxWidth: "70%",
            position: "relative",
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
}

function ContentRenderer({
  title,
  bullets,
  colors,
}: {
  title: string;
  bullets: string[];
  colors: Colors;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slide-in
  const titleProgress = spring({
    frame,
    fps,
    config: springConfigs.snappy,
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: 80 }}>
      <GradientBackground colors={[colors.bg, `${colors.accent}08`]} />
      <div
        style={{
          fontFamily: vt.fontFamily.display,
          fontSize: vt.fontSize["3xl"],
          fontWeight: vt.fontWeight.bold,
          color: colors.fg,
          marginBottom: vs[8],
          position: "relative",
          opacity: interpolate(titleProgress, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(titleProgress, [0, 1], [-30, 0])}px)`,
        }}
      >
        {title}
      </div>
      {bullets.map((bullet, i) => {
        const delay = 8 + i * 6;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: springConfigs.snappy,
          durationInFrames: 20,
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: vs[3],
              marginBottom: vs[4],
              opacity: interpolate(progress, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(progress, [0, 1], [40, 0])}px)`,
              position: "relative",
            }}
          >
            <span
              style={{
                color: colors.accent,
                fontSize: vt.fontSize.lg,
                marginTop: 4,
              }}
            >
              &#x25CF;
            </span>
            <span
              style={{
                fontFamily: vt.fontFamily.body,
                fontSize: vt.fontSize.lg,
                color: colors.muted,
                lineHeight: vt.lineHeight.normal,
              }}
            >
              {bullet}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function StatsRenderer({
  title,
  stats,
  colors,
}: {
  title: string;
  stats: Array<{ value: string; label: string; delta?: string }>;
  colors: Colors;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <GradientBackground
        colors={[colors.bg, `${colors.accent}0a`, colors.bg]}
        type="radial"
      />
      <div
        style={{
          fontFamily: vt.fontFamily.display,
          fontSize: vt.fontSize["3xl"],
          fontWeight: vt.fontWeight.bold,
          color: colors.fg,
          marginBottom: vs[12],
          textAlign: "center",
          position: "relative",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          gap: vs[6],
          justifyContent: "center",
          position: "relative",
        }}
      >
        {stats.map((stat, i) => {
          const delay = 10 + i * 8;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: springConfigs.bouncy,
            durationInFrames: 25,
          });
          const scale = interpolate(progress, [0, 1], [0.7, 1]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: vs[6],
                borderRadius: vr.lg,
                border: `1px solid ${colors.accent}33`,
                minWidth: 200,
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `scale(${scale})`,
                backgroundColor: `${colors.accent}08`,
              }}
            >
              {/* Animated counter instead of static value */}
              <Sequence from={delay}>
                <AnimatedCounter
                  value={stat.value}
                  color={colors.accent}
                  fontSize={vt.fontSize["4xl"]}
                />
              </Sequence>
              <span
                style={{
                  fontFamily: vt.fontFamily.body,
                  fontSize: vt.fontSize.md,
                  color: colors.muted,
                  marginTop: vs[2],
                }}
              >
                {stat.label}
              </span>
              {stat.delta && (
                <span
                  style={{
                    fontFamily: vt.fontFamily.mono,
                    fontSize: vt.fontSize.sm,
                    color: colors.accent,
                    marginTop: vs[1],
                    opacity: 0.8,
                  }}
                >
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

function QuoteRenderer({
  quote,
  author,
  role,
  colors,
}: {
  quote: string;
  author: string;
  role?: string;
  colors: Colors;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
    durationInFrames: 30,
  });

  // Quote mark entrance
  const quoteMarkScale = spring({
    frame,
    fps,
    config: springConfigs.elastic,
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <GradientBackground colors={[colors.bg, `${colors.accent}06`]} />
      {/* Large decorative quote mark */}
      <div
        style={{
          position: "relative",
          fontFamily: vt.fontFamily.display,
          fontSize: 200,
          color: `${colors.accent}15`,
          lineHeight: 0.8,
          transform: `scale(${quoteMarkScale})`,
          marginBottom: -40,
        }}
      >
        &ldquo;
      </div>
      <div
        style={{
          width: 80,
          height: 3,
          backgroundColor: colors.accent,
          borderRadius: 2,
          marginBottom: vs[8],
          opacity: interpolate(progress, [0, 1], [0, 1]),
          position: "relative",
        }}
      />
      <div
        style={{
          fontFamily: vt.fontFamily.display,
          fontSize: vt.fontSize["2xl"],
          fontStyle: "italic",
          color: colors.fg,
          textAlign: "center",
          lineHeight: vt.lineHeight.relaxed,
          maxWidth: "80%",
          opacity: interpolate(progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
          position: "relative",
        }}
      >
        {quote}
      </div>
      <div
        style={{
          marginTop: vs[6],
          fontFamily: vt.fontFamily.body,
          fontSize: vt.fontSize.lg,
          fontWeight: vt.fontWeight.semibold,
          color: colors.fg,
          opacity: interpolate(frame, [20, 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "relative",
        }}
      >
        {author}
      </div>
      {role && (
        <div
          style={{
            fontFamily: vt.fontFamily.body,
            fontSize: vt.fontSize.base,
            color: colors.muted,
            marginTop: vs[1],
            opacity: interpolate(frame, [25, 38], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            position: "relative",
          }}
        >
          {role}
        </div>
      )}
    </AbsoluteFill>
  );
}

function CTARenderer({
  title,
  subtitle,
  colors,
}: {
  title: string;
  subtitle?: string;
  colors: Colors;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - 5,
    fps,
    config: springConfigs.bouncy,
    durationInFrames: 30,
  });

  // Glow pulse behind CTA
  const glowOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.1, 0.3],
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <GradientBackground
        colors={[colors.bg, `${colors.accent}12`, colors.bg]}
        type="radial"
      />
      {/* Glow ring */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}33 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />
      <div
        style={{
          width: 96,
          height: 4,
          backgroundColor: colors.accent,
          borderRadius: 2,
          marginBottom: vs[8],
          position: "relative",
        }}
      />
      <div
        style={{
          fontFamily: vt.fontFamily.display,
          fontSize: vt.fontSize["4xl"],
          fontWeight: vt.fontWeight.black,
          color: colors.fg,
          textAlign: "center",
          maxWidth: "80%",
          opacity: interpolate(progress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
          position: "relative",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: vt.fontFamily.body,
            fontSize: vt.fontSize.xl,
            color: colors.muted,
            marginTop: vs[4],
            textAlign: "center",
            opacity: interpolate(frame, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            position: "relative",
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
}

// ─── Color Helpers ─────────────────────────────────────────────────────────

type Colors = { bg: string; fg: string; accent: string; muted: string };

function getColors(layout: SlideLayout): Colors {
  const overrides = layoutThemes[layout];
  return {
    bg: overrides.background ?? vc.primary900,
    fg: overrides.foreground ?? vc.white,
    accent: overrides.primary ?? vc.accent,
    muted: overrides.mutedForeground ?? vc.primary200,
  };
}

// ─── Slide Router ──────────────────────────────────────────────────────────

function renderSlide(slide: Slide, colors: Colors) {
  switch (slide.type) {
    case "title":
      return (
        <TitleRenderer
          title={slide.title}
          subtitle={slide.subtitle}
          colors={colors}
        />
      );
    case "content":
      return (
        <ContentRenderer
          title={slide.title}
          bullets={slide.bullets}
          colors={colors}
        />
      );
    case "stats":
      return (
        <StatsRenderer
          title={slide.title}
          stats={slide.stats}
          colors={colors}
        />
      );
    case "quote":
      return (
        <QuoteRenderer
          quote={slide.quote}
          author={slide.author}
          role={slide.role}
          colors={colors}
        />
      );
    case "cta":
      return (
        <CTARenderer
          title={slide.title}
          subtitle={slide.subtitle}
          colors={colors}
        />
      );
    case "image":
      return (
        <AbsoluteFill
          style={{
            backgroundColor: colors.bg,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            style={{
              maxWidth: "90%",
              maxHeight: "85%",
              objectFit: "contain",
              borderRadius: vr.lg,
            }}
          />
        </AbsoluteFill>
      );
    default:
      return <AbsoluteFill style={{ backgroundColor: colors.bg }} />;
  }
}

// ─── Slide Transition Wrapper ─────────────────────────────────────────────

function SlideWithTransition({
  children,
  transitionFrames = 12,
}: {
  children: React.ReactNode;
  transitionFrames?: number;
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in at start
  const fadeIn = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - transitionFrames, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Slight scale on entry
  const entryScale = interpolate(frame, [0, transitionFrames], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ opacity, transform: `scale(${entryScale})` }}
    >
      {children}
    </AbsoluteFill>
  );
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
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {/* Intro */}
      <Sequence from={0} durationInFrames={introFrames} name="Intro">
        <SlideWithTransition>
          <TitleRenderer
            title={title}
            subtitle={subtitle}
            colors={colors}
          />
        </SlideWithTransition>
      </Sequence>

      {/* Slides with crossfade transitions */}
      {slides.map((slide, i) => (
        <Sequence
          key={slide.id}
          from={introFrames + i * slideFrames}
          durationInFrames={slideFrames}
          name={`Slide-${slide.id}`}
        >
          <SlideWithTransition>
            {renderSlide(slide, colors)}
          </SlideWithTransition>
        </Sequence>
      ))}

      {/* Progress bar */}
      <ProgressBar color={colors.accent} height={3} />
    </AbsoluteFill>
  );
};

/** Calculate total frames */
export function calculatePitchDeckDuration(
  props: PitchDeckProps,
  fps: number = 30,
): number {
  const intro = Math.round((props.introDuration ?? 4) * fps);
  const slides =
    props.slides.length * Math.round((props.slideDuration ?? 5) * fps);
  return intro + slides;
}
