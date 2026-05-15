import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home, Settings, Users } from "lucide-react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <a {...props}>{children}</a>,
}));

import { AppSidebar, type NavGroup } from "@/components/layout/AppSidebar";

const sampleGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Users", href: "/users", icon: Users },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];

describe("AppSidebar", () => {
  it("renders with groups and shows nav items", () => {
    render(
      <AppSidebar groups={sampleGroups} title="App" subtitle="Dashboard" />
    );

    // Desktop sidebar is collapsed by default (expanded=false), so labels
    // are rendered inside TooltipContent. But the links (with href) are present.
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/users");
    expect(hrefs).toContain("/settings");
  });

  it("shows title and subtitle when sidebar is expanded", async () => {
    // The desktop sidebar starts collapsed (expanded=false). Title and subtitle
    // only render when expanded=true (on mouse enter). We simulate mouseEnter
    // to expand the sidebar and reveal title/subtitle text.
    const user = (await import("@testing-library/user-event")).default.setup();

    render(
      <AppSidebar
        groups={sampleGroups}
        title="My App"
        subtitle="Admin Panel"
      />
    );

    // Desktop sidebar is the aside element
    const aside = screen.getByRole("navigation", { name: "Main navigation" });

    // Hover to expand
    await user.hover(aside);

    // Now title and subtitle should be visible
    expect(screen.getByText("My App")).toBeInTheDocument();
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(
      <AppSidebar
        groups={sampleGroups}
        footer={<div data-testid="sidebar-footer">Footer Content</div>}
      />
    );

    const footers = screen.getAllByTestId("sidebar-footer");
    expect(footers.length).toBeGreaterThanOrEqual(1);
    expect(footers[0]).toHaveTextContent("Footer Content");
  });
});
