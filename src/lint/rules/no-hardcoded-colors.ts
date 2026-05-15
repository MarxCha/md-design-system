/**
 * ESLint Rule: no-hardcoded-colors
 *
 * Prevents using raw Tailwind color classes (bg-white, text-gray-500, etc.)
 * instead of semantic design tokens (bg-background, text-muted-foreground, etc.).
 *
 * Catches audit issue #1 (138 bg-white/text-white) and #5 (129x text-gray, 69x text-red).
 */

import type { Rule } from "eslint";

// Raw color classes that should be replaced with semantic tokens
const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; replacement: string }> = [
  // Backgrounds
  { pattern: /\bbg-white\b/, replacement: "bg-background" },
  { pattern: /\bbg-black\b/, replacement: "bg-foreground" },
  { pattern: /\bbg-gray-\d{2,3}\b/, replacement: "bg-muted or bg-card" },
  { pattern: /\bbg-slate-\d{2,3}\b/, replacement: "bg-muted or bg-card" },
  { pattern: /\bbg-red-\d{2,3}\b/, replacement: "bg-destructive" },
  { pattern: /\bbg-green-\d{2,3}\b/, replacement: "bg-accent (emerald)" },
  { pattern: /\bbg-blue-\d{2,3}\b/, replacement: "bg-primary" },

  // Text
  { pattern: /\btext-white\b/, replacement: "text-primary-foreground or text-background" },
  { pattern: /\btext-black\b/, replacement: "text-foreground" },
  { pattern: /\btext-gray-\d{2,3}\b/, replacement: "text-muted-foreground" },
  { pattern: /\btext-slate-\d{2,3}\b/, replacement: "text-muted-foreground" },
  { pattern: /\btext-red-\d{2,3}\b/, replacement: "text-destructive" },
  { pattern: /\btext-green-\d{2,3}\b/, replacement: "text-accent-foreground" },
  { pattern: /\btext-blue-\d{2,3}\b/, replacement: "text-primary" },

  // Borders
  { pattern: /\bborder-gray-\d{2,3}\b/, replacement: "border-border" },
  { pattern: /\bborder-slate-\d{2,3}\b/, replacement: "border-border" },
  { pattern: /\bborder-white\b/, replacement: "border-background" },
  { pattern: /\bborder-black\b/, replacement: "border-foreground" },
];

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow hardcoded Tailwind color classes — use semantic design tokens instead",
      recommended: true,
    },
    messages: {
      noHardcodedColor:
        'Avoid hardcoded "{{found}}". Use semantic token "{{replacement}}" instead. See md-design-system tokens.',
    },
    schema: [],
  },
  create(context) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function checkStringLiteral(node: any, value: string) {
      for (const { pattern, replacement } of FORBIDDEN_PATTERNS) {
        const match = value.match(pattern);
        if (match) {
          context.report({
            node,
            messageId: "noHardcodedColor",
            data: { found: match[0], replacement },
          });
        }
      }
    }

    return {
      // className="bg-white text-gray-500"
      Literal(node) {
        if (typeof node.value === "string") {
          const parent = node.parent as any; // eslint-disable-line @typescript-eslint/no-explicit-any
          if (parent?.type === "JSXAttribute" && parent.name?.name === "className") {
            checkStringLiteral(node, node.value);
          }
        }
      },
      // className={cn("bg-white", ...)}
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          checkStringLiteral(node, quasi.value.raw);
        }
      },
      // cn("bg-white") or clsx("bg-white")
      CallExpression(node) {
        const callee = node.callee;
        const name =
          callee.type === "Identifier" ? callee.name : null;
        if (name === "cn" || name === "clsx" || name === "twMerge") {
          for (const arg of node.arguments) {
            if (arg.type === "Literal" && typeof arg.value === "string") {
              checkStringLiteral(arg, arg.value);
            }
          }
        }
      },
    };
  },
};

export default rule;
