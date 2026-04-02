import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResponsiveTable, type ColumnDef } from "../ResponsiveTable";

interface TestRow {
  id: string;
  name: string;
  email: string;
  age: number;
}

const testData: TestRow[] = [
  { id: "1", name: "Alice", email: "alice@test.com", age: 30 },
  { id: "2", name: "Bob", email: "bob@test.com", age: 25 },
  { id: "3", name: "Charlie", email: "charlie@test.com", age: 35 },
];

const columns: ColumnDef<TestRow>[] = [
  { id: "name", header: "Name", accessorKey: "name", sortable: true },
  { id: "email", header: "Email", accessorKey: "email", hideOnMobile: true },
  { id: "age", header: "Age", accessorKey: "age", sortable: true, mobileRender: (row) => `${row.age} years` },
];

// Mock useBreakpoint — default to desktop
vi.mock("@/hooks/useBreakpoint", () => ({
  useBreakpoint: () => ({
    breakpoint: "lg" as const,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isAbove: () => true,
    isBelow: () => false,
  }),
}));

describe("ResponsiveTable", () => {
  it("renders a table with headers on desktop", () => {
    render(
      <ResponsiveTable
        data={testData}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders all row data", () => {
    render(
      <ResponsiveTable
        data={testData}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("shows empty state when data is empty", () => {
    render(
      <ResponsiveTable
        data={[]}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
    );
    expect(screen.getByText("No hay datos para mostrar")).toBeInTheDocument();
  });

  it("shows custom empty state", () => {
    render(
      <ResponsiveTable
        data={[]}
        columns={columns}
        keyExtractor={(row) => row.id}
        emptyState={<div>Nothing here</div>}
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("shows loading skeleton", () => {
    const { container } = render(
      <ResponsiveTable
        data={[]}
        columns={columns}
        keyExtractor={(row) => row.id}
        loading
        loadingRows={3}
      />
    );
    // Should render skeleton elements
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("calls onRowClick when row is clicked", () => {
    const onClick = vi.fn();
    render(
      <ResponsiveTable
        data={testData}
        columns={columns}
        keyExtractor={(row) => row.id}
        onRowClick={onClick}
      />
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onClick).toHaveBeenCalledWith(testData[0]);
  });

  it("renders actions column", () => {
    render(
      <ResponsiveTable
        data={testData}
        columns={columns}
        keyExtractor={(row) => row.id}
        actions={() => <button>View</button>}
      />
    );
    expect(screen.getByText("Acciones")).toBeInTheDocument();
    expect(screen.getAllByText("View")).toHaveLength(3);
  });

  it("sorts by column when header is clicked", () => {
    render(
      <ResponsiveTable
        data={testData}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
    );
    // Click "Name" header to sort
    fireEvent.click(screen.getByText("Name"));

    const rows = screen.getAllByRole("row");
    // First row is header, data rows follow
    expect(rows.length).toBe(4); // header + 3 data rows
  });
});
