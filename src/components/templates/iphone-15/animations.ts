import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface ScrollProps {
  trigger?: string | Element;
  toggleActions?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  [key: string]: unknown;
}

interface AnimationProps {
  [key: string]: unknown;
}

interface RotationRef {
  current: { rotation: { y: number } } | null;
}

export const animateWithGsap = (
  target: string,
  animationProps: AnimationProps,
  scrollProps?: ScrollProps
): void => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: RotationRef,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: AnimationProps
): void => {
  if (!rotationRef.current) return;
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
