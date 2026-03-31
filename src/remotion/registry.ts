/**
 * Template Video Registry
 *
 * Centralizes video-config imports from all templates.
 * Root.tsx consumes this registry to register Composition components.
 *
 * To add a new template:
 * 1. Create video-config.ts in the template directory
 * 2. Import and add it to the templateConfigs object below
 */

import * as iphone15 from "../components/templates/iphone-15/video-config";
import * as zentry from "../components/templates/zentry/video-config";
import * as gsapMacbook from "../components/templates/gsap-macbook/video-config";
import * as saasStarter from "../components/templates/saas-starter/video-config";

export interface TemplateVideoConfig {
  SLUG: string;
  brandColors: { primary: string; accent: string; background: string };
  verticalProps: import("../components/video/ProductDemo").ProductDemoProps;
  horizontalProps: import("../components/video/ProductDemo").ProductDemoProps;
}

/**
 * All template video configurations.
 * Key = PascalCase template name (used as Composition ID prefix)
 */
export const templateConfigs: Record<string, TemplateVideoConfig> = {
  IPhone15: iphone15,
  Zentry: zentry,
  GsapMacbook: gsapMacbook,
  SaasStarter: saasStarter,
};
