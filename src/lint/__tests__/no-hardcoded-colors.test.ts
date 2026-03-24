import { describe, it, expect } from "vitest";
import { RuleTester } from "eslint";
import rule from "../rules/no-hardcoded-colors";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

describe("no-hardcoded-colors", () => {
  it("passes valid and catches invalid cases", () => {
    tester.run("no-hardcoded-colors", rule, {
      valid: [
        // Semantic tokens — OK
        { code: '<div className="bg-background text-foreground" />' },
        { code: '<div className="bg-muted text-muted-foreground" />' },
        { code: '<div className="bg-card text-card-foreground" />' },
        { code: '<div className="text-destructive bg-destructive" />' },
        { code: '<div className="border-border" />' },
        // Non-className attributes — OK
        { code: '<div id="bg-white" />' },
        // Dynamic classnames in cn() with tokens — OK
        { code: 'cn("bg-background", "text-foreground")' },
      ],
      invalid: [
        // bg-white
        {
          code: '<div className="bg-white" />',
          errors: [{ messageId: "noHardcodedColor" }],
        },
        // text-white
        {
          code: '<div className="text-white p-4" />',
          errors: [{ messageId: "noHardcodedColor" }],
        },
        // text-gray-500
        {
          code: '<div className="text-gray-500" />',
          errors: [{ messageId: "noHardcodedColor" }],
        },
        // text-red-600
        {
          code: '<div className="text-red-600" />',
          errors: [{ messageId: "noHardcodedColor" }],
        },
        // bg-gray-100
        {
          code: '<div className="bg-gray-100" />',
          errors: [{ messageId: "noHardcodedColor" }],
        },
        // cn() with hardcoded
        {
          code: 'cn("bg-white", "text-black")',
          errors: [
            { messageId: "noHardcodedColor" },
            { messageId: "noHardcodedColor" },
          ],
        },
        // border
        {
          code: '<div className="border-gray-200" />',
          errors: [{ messageId: "noHardcodedColor" }],
        },
      ],
    });
  });
});
