/**
 * ESLint Rule: require-aria-label
 *
 * Ensures interactive elements with onClick have accessible names.
 * Catches audit issue #2 (113 onClick sin aria-label).
 */

import type { Rule } from "eslint";

// Elements that get accessible names from their text content
const TEXT_CONTENT_ELEMENTS = new Set([
  "a",
  "button",
  "Link",
  "Button",
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasTextContent(node: any): boolean {
  if (node.type === "JSXElement") {
    const children = node.children ?? [];
    return children.some((child: any) => {
      if (child.type === "JSXText") {
        return (child.value ?? "").trim().length > 0;
      }
      if (child.type === "JSXExpressionContainer") return true;
      if (child.type === "JSXElement") return true;
      return false;
    });
  }
  return false;
}

function hasAriaAttribute(attributes: Array<{ name?: { name?: string } }>): boolean {
  return attributes.some((attr) => {
    const name = attr.name?.name;
    return (
      name === "aria-label" ||
      name === "aria-labelledby" ||
      name === "aria-describedby" ||
      name === "title" ||
      name === "alt"
    );
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getElementName(node: any): string | null {
  const name = node.name;
  return name?.name ?? name?.property?.name ?? null;
}

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require aria-label on interactive elements without visible text content",
      recommended: true,
    },
    messages: {
      missingAriaLabel:
        'Interactive element <{{element}}> with onClick must have aria-label, aria-labelledby, or visible text content.',
    },
    schema: [],
  },
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      JSXOpeningElement(node: any) {
        const attributes = node.attributes as Array<{ name?: { name?: string }; type?: string }>;

        // Check if element has onClick
        const hasOnClick = attributes.some(
          (attr) => attr.name?.name === "onClick"
        );
        if (!hasOnClick) return;

        // If it has aria-label or similar, it's fine
        if (hasAriaAttribute(attributes)) return;

        const elementName = getElementName(node);

        // If it's a text-content element (button, a, Link), check for text
        if (elementName && TEXT_CONTENT_ELEMENTS.has(elementName)) {
          const parent = node.parent;
          if (parent && hasTextContent(parent)) return;
        }

        // Icon-only buttons, div onClick, span onClick — need aria-label
        context.report({
          node,
          messageId: "missingAriaLabel",
          data: { element: elementName ?? "unknown" },
        });
      },
    };
  },
};

export default rule;
