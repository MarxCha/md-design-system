import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormGrid, FormField } from "../FormGrid";

describe("FormGrid", () => {
  it("renders children in a grid", () => {
    render(
      <FormGrid>
        <FormField>
          <label>Name</label>
          <input />
        </FormField>
        <FormField>
          <label>Email</label>
          <input />
        </FormField>
      </FormGrid>
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("applies data-slot attributes", () => {
    const { container } = render(
      <FormGrid>
        <FormField>
          <span>Field</span>
        </FormField>
      </FormGrid>
    );
    expect(container.querySelector("[data-slot='form-grid']")).toBeTruthy();
    expect(container.querySelector("[data-slot='form-field']")).toBeTruthy();
  });

  it("applies default grid classes", () => {
    const { container } = render(
      <FormGrid>
        <FormField><span>A</span></FormField>
      </FormGrid>
    );
    const grid = container.querySelector("[data-slot='form-grid']");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("supports custom columns", () => {
    const { container } = render(
      <FormGrid columns={{ sm: 1, md: 3, lg: 4 }}>
        <FormField><span>A</span></FormField>
      </FormGrid>
    );
    const grid = container.querySelector("[data-slot='form-grid']");
    expect(grid?.className).toContain("md:grid-cols-3");
    expect(grid?.className).toContain("lg:grid-cols-4");
  });

  it("FormField supports span", () => {
    const { container } = render(
      <FormGrid>
        <FormField span={{ md: 2, lg: 3 }}>
          <span>Wide field</span>
        </FormField>
      </FormGrid>
    );
    const field = container.querySelector("[data-slot='form-field']");
    expect(field?.className).toContain("md:col-span-2");
    expect(field?.className).toContain("lg:col-span-3");
  });

  it("applies custom gap", () => {
    const { container } = render(
      <FormGrid gap="gap-6">
        <FormField><span>A</span></FormField>
      </FormGrid>
    );
    const grid = container.querySelector("[data-slot='form-grid']");
    expect(grid?.className).toContain("gap-6");
  });
});
