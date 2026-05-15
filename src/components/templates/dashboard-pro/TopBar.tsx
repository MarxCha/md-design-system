"use client";

import { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, User, HelpCircle } from "lucide-react";
import { notifications, userProfile } from "./constants";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav className="dp-topbar__breadcrumb" aria-label="Breadcrumb">
      <ol className="dp-topbar__breadcrumb-list" role="list">
        <li>
          <span className="dp-topbar__breadcrumb-item dp-topbar__breadcrumb-item--root">
            Dashboard
          </span>
        </li>
        <li aria-hidden="true" className="dp-topbar__breadcrumb-sep">
          /
        </li>
        <li>
          <span
            className="dp-topbar__breadcrumb-item dp-topbar__breadcrumb-item--current"
            aria-current="page"
          >
            Overview
          </span>
        </li>
      </ol>
    </nav>
  );
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="dp-topbar__notif-wrap">
      <button
        type="button"
        className="dp-topbar__icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications — ${unread} unread`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Bell size={18} aria-hidden="true" />
        {unread > 0 && (
          <span className="dp-topbar__notif-badge" aria-hidden="true">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="dp-topbar__backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="dp-topbar__notif-panel"
            role="listbox"
            aria-label="Notifications"
          >
            <p className="dp-topbar__notif-heading">Notifications</p>
            <ul role="list">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  role="option"
                  aria-selected={false}
                  className={`dp-topbar__notif-item${n.read ? "" : " dp-topbar__notif-item--unread"}`}
                >
                  {!n.read && (
                    <span className="dp-topbar__notif-dot" aria-hidden="true" />
                  )}
                  <div>
                    <p className="dp-topbar__notif-title">{n.title}</p>
                    <p className="dp-topbar__notif-desc">{n.description}</p>
                    <p className="dp-topbar__notif-time">{n.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

// ─── UserDropdown ─────────────────────────────────────────────────────────────

function UserDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dp-topbar__user-wrap">
      <button
        type="button"
        className="dp-topbar__user-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="dp-topbar__user-avatar" aria-hidden="true">
          {userProfile.avatarInitials}
        </div>
        <span className="dp-topbar__user-name">{userProfile.name}</span>
        <ChevronDown
          size={14}
          className={`dp-topbar__user-chevron${open ? " dp-topbar__user-chevron--open" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <>
          <div
            className="dp-topbar__backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="dp-topbar__user-menu" role="menu">
            <div className="dp-topbar__user-menu-header">
              <p className="dp-topbar__user-menu-name">{userProfile.name}</p>
              <p className="dp-topbar__user-menu-email">{userProfile.email}</p>
            </div>
            <div className="dp-topbar__user-menu-divider" role="separator" />
            <ul role="list">
              <li>
                <button
                  type="button"
                  role="menuitem"
                  className="dp-topbar__user-menu-item"
                >
                  <User size={14} aria-hidden="true" />
                  Profile
                </button>
              </li>
              <li>
                <button
                  type="button"
                  role="menuitem"
                  className="dp-topbar__user-menu-item"
                >
                  <HelpCircle size={14} aria-hidden="true" />
                  Help
                </button>
              </li>
            </ul>
            <div className="dp-topbar__user-menu-divider" role="separator" />
            <ul role="list">
              <li>
                <button
                  type="button"
                  role="menuitem"
                  className="dp-topbar__user-menu-item dp-topbar__user-menu-item--danger"
                >
                  <LogOut size={14} aria-hidden="true" />
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

export default function TopBar() {
  return (
    <header className="dp-topbar" role="banner">
      <Breadcrumb />

      {/* Search */}
      <div className="dp-topbar__search-wrap">
        <label htmlFor="dp-search" className="dp-topbar__search-label">
          Search
        </label>
        <div className="dp-topbar__search-inner">
          <Search
            size={14}
            className="dp-topbar__search-icon"
            aria-hidden="true"
          />
          <input
            id="dp-search"
            type="search"
            placeholder="Search orders, customers..."
            className="dp-topbar__search-input"
            aria-label="Search orders, customers and more"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="dp-topbar__actions">
        <NotificationBell />
        <UserDropdown />
      </div>
    </header>
  );
}
