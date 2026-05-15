"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  Settings,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { sidebarLinks, userProfile, type NavItem } from "./constants";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  Settings,
};

// ─── NavLink ──────────────────────────────────────────────────────────────────

interface NavLinkProps {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}

function NavLink({ item, active, onClick }: NavLinkProps) {
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;

  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={[
        "dp-nav-link",
        active ? "dp-nav-link--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="dp-nav-link__icon" aria-hidden="true" />
      <span className="dp-nav-link__label">{item.label}</span>
      {active && (
        <ChevronRight
          className="dp-nav-link__chevron"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeLink?: string;
  onNavigate?: (href: string) => void;
}

export default function Sidebar({ activeLink = "#overview", onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNavigate(href: string) {
    onNavigate?.(href);
    setMobileOpen(false);
  }

  const sidebarContent = (
    <nav className="dp-sidebar__inner" aria-label="Main navigation">
      {/* Logo */}
      <div className="dp-sidebar__logo" aria-label="Dashboard Pro">
        <div className="dp-sidebar__logo-icon" aria-hidden="true">
          <LayoutDashboard size={18} />
        </div>
        <span className="dp-sidebar__logo-text">Dashboard Pro</span>
      </div>

      {/* Divider */}
      <div className="dp-sidebar__divider" role="separator" />

      {/* Nav links */}
      <ul className="dp-sidebar__nav-list" role="list">
        {sidebarLinks.map((item) => (
          <li key={item.href}>
            <NavLink
              item={item}
              active={activeLink === item.href}
              onClick={() => handleNavigate(item.href)}
            />
          </li>
        ))}
      </ul>

      {/* Spacer */}
      <div className="dp-sidebar__spacer" aria-hidden="true" />

      {/* Divider */}
      <div className="dp-sidebar__divider" role="separator" />

      {/* User avatar at bottom */}
      <div className="dp-sidebar__user">
        <div className="dp-sidebar__user-avatar" aria-hidden="true">
          {userProfile.avatarInitials}
        </div>
        <div className="dp-sidebar__user-info">
          <p className="dp-sidebar__user-name">{userProfile.name}</p>
          <p className="dp-sidebar__user-role">{userProfile.role}</p>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar — always visible at lg+ */}
      <aside className="dp-sidebar dp-sidebar--desktop" aria-label="Sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile toggle button */}
      <button
        type="button"
        className="dp-sidebar__mobile-toggle"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        aria-controls="dp-mobile-sidebar"
      >
        {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="dp-sidebar__overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="dp-mobile-sidebar"
            className="dp-sidebar dp-sidebar--mobile"
            aria-label="Sidebar"
          >
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
