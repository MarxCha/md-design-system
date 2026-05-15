import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { BrandReveal, type BrandRevealProps } from "./BrandReveal";
import { TextHook, type TextHookProps } from "./TextHook";
import { DeviceMockup } from "./DeviceMockup";
import { FeatureShowcase, type FeatureShowcaseProps } from "./FeatureShowcase";
import { CTAEnd, type CTAEndProps } from "./CTAEnd";
import { VIDEO_FPS } from "./video-tokens";

/**
 * Screen definition — each screen maps to a composition
 * with a start frame and duration in seconds.
 */
type Screen = {
  screenshotSrc: string;
  caption: string;
  device?: "iphone" | "laptop";
  zoom?: number;
};

export type ProductDemoProps = {
  /** Brand reveal config */
  brand?: Partial<BrandRevealProps>;
  /** Opening hook text */
  hook?: Partial<TextHookProps>;
  /** App screens to showcase (2-4) */
  screens?: Screen[];
  /** Feature list */
  features?: FeatureShowcaseProps;
  /** CTA config */
  cta?: Partial<CTAEndProps>;
  /** Duration of brand reveal in seconds */
  brandDuration?: number;
  /** Duration of hook in seconds */
  hookDuration?: number;
  /** Duration per screen in seconds */
  screenDuration?: number;
  /** Duration of features section in seconds */
  featureDuration?: number;
  /** Duration of CTA in seconds */
  ctaDuration?: number;
};

export const ProductDemo: React.FC<ProductDemoProps> = ({
  brand = {},
  hook = { text: "Tu app. En produccion.", subtitle: "De idea a deploy" },
  screens = [],
  features,
  cta = {},
  brandDuration = 3,
  hookDuration = 2.5,
  screenDuration = 4,
  featureDuration = 4,
  ctaDuration = 3,
}) => {
  const { fps } = useVideoConfig();

  // Calculate frame positions
  const brandFrames = Math.round(brandDuration * fps);
  const hookFrames = Math.round(hookDuration * fps);
  const screenFrames = Math.round(screenDuration * fps);
  const featureFrames = Math.round(featureDuration * fps);
  const ctaFrames = Math.round(ctaDuration * fps);

  let cursor = 0;

  const sequences: Array<{
    from: number;
    duration: number;
    content: React.ReactNode;
    name: string;
  }> = [];

  // 1. Brand Reveal
  sequences.push({
    from: cursor,
    duration: brandFrames,
    content: <BrandReveal {...brand} />,
    name: "BrandReveal",
  });
  cursor += brandFrames;

  // 2. Text Hook
  sequences.push({
    from: cursor,
    duration: hookFrames,
    content: (
      <TextHook
        text={hook.text ?? "Tu app. En produccion."}
        subtitle={hook.subtitle}
        bgColor={hook.bgColor}
        textColor={hook.textColor}
        accentColor={hook.accentColor}
      />
    ),
    name: "TextHook",
  });
  cursor += hookFrames;

  // 3. Device Screens
  screens.forEach((screen, i) => {
    sequences.push({
      from: cursor,
      duration: screenFrames,
      content: (
        <DeviceMockup
          screenshotSrc={screen.screenshotSrc}
          device={screen.device ?? "iphone"}
          caption={screen.caption}
          zoom={screen.zoom}
        />
      ),
      name: `Screen-${i + 1}`,
    });
    cursor += screenFrames;
  });

  // 4. Features
  if (features) {
    sequences.push({
      from: cursor,
      duration: featureFrames,
      content: <FeatureShowcase {...features} />,
      name: "Features",
    });
    cursor += featureFrames;
  }

  // 5. CTA End
  sequences.push({
    from: cursor,
    duration: ctaFrames,
    content: <CTAEnd {...cta} />,
    name: "CTAEnd",
  });

  return (
    <AbsoluteFill>
      {sequences.map((seq) => (
        <Sequence
          key={seq.name}
          from={seq.from}
          durationInFrames={seq.duration}
          name={seq.name}
        >
          {seq.content}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/**
 * Helper: calculate total duration in frames for a ProductDemo config.
 * Use this when registering the composition in Root.tsx.
 */
export function calculateProductDemoDuration(
  props: Partial<ProductDemoProps>,
  fps: number = VIDEO_FPS,
): number {
  const brandFrames = Math.round((props.brandDuration ?? 3) * fps);
  const hookFrames = Math.round((props.hookDuration ?? 2.5) * fps);
  const screenFrames = Math.round((props.screenDuration ?? 4) * fps) * (props.screens?.length ?? 0);
  const featureFrames = props.features
    ? Math.round((props.featureDuration ?? 4) * fps)
    : 0;
  const ctaFrames = Math.round((props.ctaDuration ?? 3) * fps);

  return brandFrames + hookFrames + screenFrames + featureFrames + ctaFrames;
}
