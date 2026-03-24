import { describe, it, expect } from "vitest";
import { RuleTester } from "eslint";
import rule from "../rules/require-aria-label";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

describe("require-aria-label", () => {
  it("passes valid and catches invalid cases", () => {
    tester.run("require-aria-label", rule, {
      valid: [
        // Button with text content
        { code: '<button onClick={fn}>Save</button>' },
        // With aria-label
        { code: '<div onClick={fn} aria-label="Close menu" />' },
        // With aria-labelledby
        { code: '<span onClick={fn} aria-labelledby="heading" />' },
        // With title
        { code: '<div onClick={fn} title="More info" />' },
        // No onClick — doesn't apply
        { code: '<div className="icon" />' },
        // Button with child element
        { code: '<button onClick={fn}><span>Text</span></button>' },
      ],
      invalid: [
        // Icon-only button without aria-label
        {
          code: '<button onClick={fn}></button>',
          errors: [{ messageId: "missingAriaLabel" }],
        },
        // div with onClick, no label
        {
          code: '<div onClick={fn} />' ,
          errors: [{ messageId: "missingAriaLabel" }],
        },
        // span with onClick, no label
        {
          code: '<span onClick={fn} />' ,
          errors: [{ messageId: "missingAriaLabel" }],
        },
      ],
    });
  });
});
