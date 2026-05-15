import { describe, it } from "vitest";
import { RuleTester } from "eslint";
import rule from "../rules/require-image-alt";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

describe("require-image-alt", () => {
  it("passes valid and catches invalid cases", () => {
    tester.run("require-image-alt", rule, {
      valid: [
        // Good alt text
        { code: '<img alt="Dashboard showing patient statistics" />' },
        // Next.js Image with good alt
        { code: '<Image alt="Dr. Rodriguez profile photo" />' },
        // Decorative image — explicit empty alt
        { code: '<img alt="" />' },
        // Dynamic alt
        { code: '<img alt={patient.name} />' },
        // Non-image element
        { code: '<div />' },
      ],
      invalid: [
        // Missing alt entirely
        {
          code: '<img src="/photo.jpg" />',
          errors: [{ messageId: "missingAlt" }],
        },
        // Next.js Image missing alt
        {
          code: '<Image src="/photo.jpg" />',
          errors: [{ messageId: "missingAlt" }],
        },
        // Placeholder alt "image"
        {
          code: '<img alt="image" />',
          errors: [{ messageId: "placeholderAlt" }],
        },
        // Placeholder alt "icon"
        {
          code: '<img alt="icon" />',
          errors: [{ messageId: "placeholderAlt" }],
        },
        // Placeholder alt "logo"
        {
          code: '<Image alt="logo" />',
          errors: [{ messageId: "placeholderAlt" }],
        },
        // Placeholder alt "foto"
        {
          code: '<img alt="foto" />',
          errors: [{ messageId: "placeholderAlt" }],
        },
      ],
    });
  });
});
