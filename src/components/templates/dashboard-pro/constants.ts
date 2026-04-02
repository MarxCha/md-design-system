// ─── Dashboard Pro Template — Constants & Content ────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "dashboard-pro";
export const TEMPLATE_NAME = "Dashboard Pro";

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string; // Lucide icon name
}

export const sidebarLinks: NavItem[] = [
  { label: "Overview",   href: "#overview",   icon: "LayoutDashboard" },
  { label: "Analytics",  href: "#analytics",  icon: "BarChart3" },
  { label: "Orders",     href: "#orders",     icon: "ShoppingCart" },
  { label: "Customers",  href: "#customers",  icon: "Users" },
  { label: "Products",   href: "#products",   icon: "Package" },
  { label: "Settings",   href: "#settings",   icon: "Settings" },
];

export const navItems = sidebarLinks.map((l) => l.label);

// ─── KPI Cards ────────────────────────────────────────────────────────────────

export interface KPIData {
  id: string;
  label: string;
  value: string;
  change: number;   // positive = up, negative = down
  changeLabel: string;
  prefix?: string;
  suffix?: string;
  sparkline: number[]; // 7-point sparkline values (relative)
}

export const kpiData: KPIData[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "48.2K",
    prefix: "$",
    change: 12.5,
    changeLabel: "vs last month",
    sparkline: [32, 38, 30, 42, 39, 44, 48],
  },
  {
    id: "users",
    label: "Active Users",
    value: "2,847",
    change: 8.3,
    changeLabel: "vs last month",
    sparkline: [2100, 2300, 2200, 2500, 2600, 2750, 2847],
  },
  {
    id: "orders",
    label: "New Orders",
    value: "1,234",
    change: -2.1,
    changeLabel: "vs last month",
    sparkline: [1400, 1350, 1290, 1310, 1280, 1255, 1234],
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "3.24",
    suffix: "%",
    change: 0.5,
    changeLabel: "vs last month",
    sparkline: [2.8, 2.9, 3.0, 3.1, 3.05, 3.18, 3.24],
  },
];

// ─── Table Data ───────────────────────────────────────────────────────────────

export type OrderStatus = "completed" | "pending" | "failed" | "refunded";

export interface OrderRow {
  id: string;
  customer: string;
  email: string;
  status: OrderStatus;
  amount: string;
  date: string;
}

export const tableData: OrderRow[] = [
  {
    id: "ORD-001",
    customer: "Alice Morales",
    email: "alice@example.com",
    status: "completed",
    amount: "$320.00",
    date: "Mar 28, 2026",
  },
  {
    id: "ORD-002",
    customer: "Carlos Hernández",
    email: "c.hernandez@example.com",
    status: "pending",
    amount: "$85.50",
    date: "Mar 29, 2026",
  },
  {
    id: "ORD-003",
    customer: "Diana Kim",
    email: "diana.kim@example.com",
    status: "failed",
    amount: "$210.00",
    date: "Mar 29, 2026",
  },
  {
    id: "ORD-004",
    customer: "Ethan Park",
    email: "epark@example.com",
    status: "completed",
    amount: "$540.75",
    date: "Mar 30, 2026",
  },
  {
    id: "ORD-005",
    customer: "Fernanda López",
    email: "f.lopez@example.com",
    status: "refunded",
    amount: "$95.00",
    date: "Mar 31, 2026",
  },
];

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface ChartPoint {
  month: string;
  revenue: number;
  orders: number;
}

export const chartData: ChartPoint[] = [
  { month: "Sep", revenue: 32000, orders: 890 },
  { month: "Oct", revenue: 38000, orders: 1020 },
  { month: "Nov", revenue: 35000, orders: 970 },
  { month: "Dec", revenue: 45000, orders: 1180 },
  { month: "Jan", revenue: 41000, orders: 1090 },
  { month: "Feb", revenue: 43500, orders: 1150 },
  { month: "Mar", revenue: 48200, orders: 1234 },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "New order received",
    description: "Order ORD-005 from Fernanda López",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    title: "Payment failed",
    description: "Order ORD-003 payment could not be processed",
    time: "14 min ago",
    read: false,
  },
  {
    id: "n3",
    title: "Monthly report ready",
    description: "Your March 2026 report is available",
    time: "1 hr ago",
    read: true,
  },
];

// ─── User Profile ─────────────────────────────────────────────────────────────

export const userProfile = {
  name: "Marx Chávez",
  role: "Admin",
  email: "marx@consultoriamd.com.mx",
  avatarInitials: "MC",
};

// ─── Activity Feed ────────────────────────────────────────────────────────────

export interface ActivityItem {
  id: string;
  actor: string;
  actorInitials: string;
  action: string;
  target: string;
  time: string;
}

export const activityItems: ActivityItem[] = [
  {
    id: "a1",
    actor: "Alice Morales",
    actorInitials: "AM",
    action: "completed order",
    target: "ORD-001",
    time: "Just now",
  },
  {
    id: "a2",
    actor: "System",
    actorInitials: "SY",
    action: "sent invoice for",
    target: "ORD-004",
    time: "12 min ago",
  },
  {
    id: "a3",
    actor: "Carlos Hernández",
    actorInitials: "CH",
    action: "placed order",
    target: "ORD-002",
    time: "27 min ago",
  },
  {
    id: "a4",
    actor: "Fernanda López",
    actorInitials: "FL",
    action: "requested refund for",
    target: "ORD-005",
    time: "1 hr ago",
  },
  {
    id: "a5",
    actor: "Marx Chávez",
    actorInitials: "MC",
    action: "updated pricing for",
    target: "Product #42",
    time: "3 hrs ago",
  },
];
