"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// ─── Types ───────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface AppSidebarProps {
  groups: NavGroup[];
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────

function isRouteActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

// ─── NavLink (single item) ──────────────────────────────────

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  expanded: boolean;
}

function NavLink({ item, isActive, expanded }: NavLinkProps) {
  const Icon = item.icon;

  const linkContent = (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5",
        "transition-all duration-200 ease-out",
        "hover:bg-[hsl(var(--accent)/0.1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
        isActive
          ? "text-[hsl(var(--primary-foreground))]"
          : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
        !expanded && "justify-center px-0"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-[var(--radius-md)] bg-[hsl(var(--primary))]"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />
      )}
      <Icon
        className={cn(
          "relative z-10 size-5 shrink-0",
          "transition-colors duration-200"
        )}
      />
      {expanded && (
        <span className="relative z-10 truncate text-sm font-medium">
          {item.label}
        </span>
      )}
    </Link>
  );

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

// ─── NavGroupSection ─────────────────────────────────────────

interface NavGroupSectionProps {
  group: NavGroup;
  expanded: boolean;
  pathname: string;
}

function NavGroupSection({ group, expanded, pathname }: NavGroupSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {expanded && (
        <span className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground)/0.6)]">
          {group.label}
        </span>
      )}
      {group.items.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          isActive={isRouteActive(item.href, pathname)}
          expanded={expanded}
        />
      ))}
    </div>
  );
}

// ─── SidebarContent (shared between desktop & mobile) ────────

interface SidebarContentProps {
  groups: NavGroup[];
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  expanded: boolean;
  pathname: string;
}

function SidebarContent({
  groups,
  logo,
  title,
  subtitle,
  footer,
  expanded,
  pathname,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-b border-[hsl(var(--border)/0.1)] px-4 py-5",
          !expanded && "justify-center px-2"
        )}
      >
        {logo && <div className="shrink-0">{logo}</div>}
        {expanded && (title || subtitle) && (
          <div className="flex min-w-0 flex-col">
            {title && (
              <span className="truncate text-sm font-bold tracking-tight text-[hsl(var(--foreground))]">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="truncate text-[11px] text-[hsl(var(--muted-foreground))]">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <NavGroupSection
              key={group.label}
              group={group}
              expanded={expanded}
              pathname={pathname}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            "shrink-0 border-t border-[hsl(var(--border)/0.1)] px-4 py-4",
            !expanded && "px-2"
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// ─── MobileSidebar ───────────────────────────────────────────

function MobileSidebar(props: AppSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            "fixed left-4 top-4 z-50 flex size-10 items-center justify-center",
            "rounded-[var(--radius-md)] bg-[hsl(var(--background))]",
            "shadow-md",
            "transition-colors duration-200",
            "hover:bg-[hsl(var(--accent)/0.1)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
            "md:hidden"
          )}
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-5 text-[hsl(var(--foreground))]" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 bg-[hsl(var(--sidebar-background,var(--background)))] p-0"
        showCloseButton
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{props.title ?? "Navigation"}</SheetTitle>
        </SheetHeader>
        <TooltipProvider>
          <SidebarContent
            groups={props.groups}
            logo={props.logo}
            title={props.title}
            subtitle={props.subtitle}
            footer={props.footer}
            expanded
            pathname={pathname}
          />
        </TooltipProvider>
      </SheetContent>
    </Sheet>
  );
}

// ─── DesktopSidebar ──────────────────────────────────────────

function DesktopSidebar(props: AppSidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-dvh md:flex",
        "flex-col",
        "bg-[hsl(var(--sidebar-background,var(--background)))]",
        "shadow-[4px_0_24px_-4px_hsl(var(--foreground)/0.08)]",
        "transition-all duration-200 ease-out",
        expanded ? "w-64" : "w-16",
        props.className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <TooltipProvider>
        <AnimatePresence mode="wait">
          <SidebarContent
            groups={props.groups}
            logo={props.logo}
            title={props.title}
            subtitle={props.subtitle}
            footer={props.footer}
            expanded={expanded}
            pathname={pathname}
          />
        </AnimatePresence>
      </TooltipProvider>
    </aside>
  );
}

// ─── AppSidebar (public) ─────────────────────────────────────

export function AppSidebar(props: AppSidebarProps) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
}
