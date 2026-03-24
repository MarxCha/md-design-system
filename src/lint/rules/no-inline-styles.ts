/**
 * ESLint Rule: no-inline-styles
 *
 * Prevents using inline style={{}} in JSX except for allowed dynamic properties.
 * Forces Tailwind utility classes for maintainability and design system consistency.
 *
 * Catches audit issue #6 (25 inline styles in PDFs/signature).
 */

import type { Rule } from "eslint";

// Properties that are OK to set inline (truly dynamic values)
const ALLOWED_PROPERTIES = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "transform",
  "backgroundColor", // for dynamic color pickers
  "color",           // for dynamic color pickers
  "gridTemplateColumns",
  "gridTemplateRows",
  "--",              // CSS custom properties
  "pointerEvents",   // R3F Canvas fix
]);

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow inline styles in JSX — use Tailwind classes instead",
      recommended: true,
    },
    messages: {
      noInlineStyle:
        "Avoid inline style={{}}. Use Tailwind utility classes. If truly dynamic, add property to allowlist.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowedProperties: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const extraAllowed = new Set<string>(options.allowedProperties || []);
    const allowed = new Set([...ALLOWED_PROPERTIES, ...extraAllowed]);

    return {
      // eslint types don't include JSX visitors, but they work at runtime
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      JSXAttribute(node: any) {
        if (
          node.name.name !== "style" ||
          !node.value ||
          node.value.type !== "JSXExpressionContainer"
        ) {
          return;
        }

        const expr = node.value.expression;

        // style={variable} — can't analyze, skip
        if (expr.type === "Identifier") return;

        // style={{ ... }} — check properties
        if (expr.type === "ObjectExpression") {
          const hasDisallowed = expr.properties.some((prop: any) => {
            if (prop.type !== "Property") return false;
            const key =
              prop.key.type === "Identifier"
                ? prop.key.name
                : prop.key.type === "Literal"
                  ? String(prop.key.value)
                  : null;
            if (!key) return false;
            // Allow CSS custom properties (--anything)
            if (key.startsWith("--")) return false;
            return !allowed.has(key);
          });

          if (hasDisallowed) {
            context.report({ node, messageId: "noInlineStyle" });
          }
        }
      },
    };
  },
};

export default rule;
