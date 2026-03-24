/**
 * ESLint Rule: require-image-alt
 *
 * Ensures all <img> and <Image> (Next.js) elements have meaningful alt text.
 * Empty alt="" is allowed for decorative images but must be explicit.
 *
 * Catches audit issue #4 (Alt text faltante en 10+ componentes).
 *
 * Note: jsx-a11y/alt-text exists but this rule is stricter:
 * - Rejects placeholder alts like "image", "foto", "icon", "logo"
 * - Works with Next.js <Image> component
 */

import type { Rule } from "eslint";

const PLACEHOLDER_ALTS = new Set([
  "image",
  "img",
  "foto",
  "photo",
  "picture",
  "icon",
  "logo",
  "banner",
  "thumbnail",
  "placeholder",
  "untitled",
  "sin titulo",
  "sin título",
]);

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require meaningful alt text on <img> and <Image> elements",
      recommended: true,
    },
    messages: {
      missingAlt: '<{{element}}> must have an alt attribute. Use alt="" for decorative images.',
      placeholderAlt:
        'Alt text "{{alt}}" is too generic. Describe the image content or use alt="" for decorative images.',
    },
    schema: [],
  },
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      JSXOpeningElement(node: any) {
        const elementName = node.name?.name;
        if (elementName !== "img" && elementName !== "Image") return;

        const attributes = node.attributes as Array<{ name?: { name?: string }; value?: { value?: string; type?: string } }>;

        const altAttr = attributes.find(
          (attr) => attr.name?.name === "alt"
        );

        if (!altAttr) {
          context.report({
            node,
            messageId: "missingAlt",
            data: { element: elementName },
          });
          return;
        }

        // Check for placeholder alt text
        const altValue = altAttr.value;
        if (altValue && altValue.type === "Literal" && typeof altValue.value === "string") {
          const normalized = altValue.value.trim().toLowerCase();
          if (normalized.length > 0 && PLACEHOLDER_ALTS.has(normalized)) {
            context.report({
              node,
              messageId: "placeholderAlt",
              data: { alt: altValue.value },
            });
          }
        }
      },
    };
  },
};

export default rule;
