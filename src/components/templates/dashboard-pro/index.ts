// ─── Dashboard Pro Template — Barrel Export ──────────────────────────────────

// ── Foundation ────────────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ────────────
export { default as Sidebar }      from "./Sidebar";
export { default as TopBar }       from "./TopBar";
export { default as KPICards }     from "./KPICards";
export { default as DataTable }    from "./DataTable";
export { default as ActivityFeed } from "./ActivityFeed";

// ── Named components (DashboardPro-prefixed — for use in other contexts) ──────
export { default as DashboardProSidebar }      from "./Sidebar";
export { default as DashboardProTopBar }       from "./TopBar";
export { default as DashboardProKPICards }     from "./KPICards";
export { default as DashboardProDataTable }    from "./DataTable";
export { default as DashboardProActivityFeed } from "./ActivityFeed";
