"use client";

import { useState } from "react";
import {
  Sidebar,
  TopBar,
  KPICards,
  DataTable,
  ActivityFeed,
} from "@/components/templates/dashboard-pro";

export default function DashboardProPage() {
  const [activeLink, setActiveLink] = useState("#overview");

  return (
    <div className="dp-shell">
      {/* Fixed left sidebar */}
      <Sidebar activeLink={activeLink} onNavigate={setActiveLink} />

      {/* Main content area */}
      <div className="dp-main">
        {/* Sticky top bar */}
        <TopBar />

        {/* Page content */}
        <main id="dp-main-content" className="dp-content">
          {/* KPI row — GSAP stagger entrance */}
          <KPICards />

          {/* Bottom grid: table + activity */}
          <div className="dp-bottom-grid">
            <DataTable />
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  );
}
