"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./AppSidebar";
import type { AppSidebarProps } from "./AppSidebar";

export interface AppShellProps {
  sidebar: AppSidebarProps;
  children: React.ReactNode;
  className?: string;
}

/**
 * AppShell — Layout wrapper combining AppSidebar with main content.
 *
 * On desktop (>=768px): renders sidebar rail + content with left margin.
 * On mobile (<768px): no margin, sidebar becomes a Sheet overlay.
 */
export function AppShell({ sidebar, children, className }: AppShellProps) {
  return (
    <div className="relative min-h-dvh">
      <AppSidebar {...sidebar} />

      {/* Main content area — offset by rail width on desktop */}
      <main
        className={cn(
          "min-h-dvh transition-[margin] duration-200 ease-out",
          "ml-0 md:ml-16",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
