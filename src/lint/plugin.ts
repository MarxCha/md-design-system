/**
 * MD Design System — ESLint Plugin
 *
 * Custom rules that enforce design system consistency and accessibility.
 * Prevents the most common issues found in audits:
 * - Hardcoded colors instead of semantic tokens
 * - Missing aria-labels on interactive elements
 * - Missing alt text on images
 * - Inline styles instead of Tailwind classes
 *
 * Usage in consumer projects:
 *   import mdPlugin from "md-design-system/lint";
 *   export default [mdPlugin.configs.recommended];
 */

import noHardcodedColors from "./rules/no-hardcoded-colors";
import noInlineStyles from "./rules/no-inline-styles";
import requireAriaLabel from "./rules/require-aria-label";
import requireImageAlt from "./rules/require-image-alt";

const plugin = {
  meta: {
    name: "eslint-plugin-md-design-system",
    version: "0.1.0",
  },
  rules: {
    "no-hardcoded-colors": noHardcodedColors,
    "no-inline-styles": noInlineStyles,
    "require-aria-label": requireAriaLabel,
    "require-image-alt": requireImageAlt,
  },
  configs: {} as Record<string, unknown>,
};

// Self-referencing config — ESLint flat config pattern
plugin.configs.recommended = {
  plugins: {
    "md-design-system": plugin,
  },
  rules: {
    "md-design-system/no-hardcoded-colors": "warn",
    "md-design-system/no-inline-styles": "warn",
    "md-design-system/require-aria-label": "warn",
    "md-design-system/require-image-alt": "warn",
  },
};

plugin.configs.strict = {
  plugins: {
    "md-design-system": plugin,
  },
  rules: {
    "md-design-system/no-hardcoded-colors": "error",
    "md-design-system/no-inline-styles": "error",
    "md-design-system/require-aria-label": "error",
    "md-design-system/require-image-alt": "error",
  },
};

export default plugin;
export { plugin };
export type { };
