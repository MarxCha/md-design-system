"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { tableData, type OrderRow, type OrderStatus } from "./constants";

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<OrderStatus, string> = {
  completed: "Completed",
  pending:   "Pending",
  failed:    "Failed",
  refunded:  "Refunded",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`dp-table__badge dp-table__badge--${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── SortIcon ─────────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc" | null;

function SortIcon({ dir }: { dir: SortDir }) {
  if (dir === "asc") return <ArrowUp size={12} aria-hidden="true" />;
  if (dir === "desc") return <ArrowDown size={12} aria-hidden="true" />;
  return <ArrowUpDown size={12} aria-hidden="true" />;
}

// ─── Column config ────────────────────────────────────────────────────────────

type SortableKey = "customer" | "amount" | "date" | "status";

interface Column {
  key: SortableKey;
  label: string;
  sortable: boolean;
}

const COLUMNS: Column[] = [
  { key: "customer", label: "Customer",   sortable: true  },
  { key: "status",   label: "Status",     sortable: true  },
  { key: "amount",   label: "Amount",     sortable: true  },
  { key: "date",     label: "Date",       sortable: true  },
];

// ─── DataTable ────────────────────────────────────────────────────────────────

export default function DataTable() {
  const [sortKey,  setSortKey]  = useState<SortableKey | null>(null);
  const [sortDir,  setSortDir]  = useState<SortDir>(null);

  function handleSort(key: SortableKey) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  }

  const sorted: OrderRow[] = [...tableData].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <section className="dp-table-section" aria-labelledby="dp-table-heading">
      <div className="dp-table-section__header">
        <h2 id="dp-table-heading" className="dp-table-section__title">
          Recent Orders
        </h2>
        <button type="button" className="dp-table-section__view-all">
          View all
        </button>
      </div>

      {/* Scrollable wrapper for mobile */}
      <div className="dp-table-wrap" role="region" aria-label="Orders table" tabIndex={0}>
        <table className="dp-table" aria-label="Recent orders">
          <thead>
            <tr>
              {COLUMNS.map((col) => {
                const currentDir = sortKey === col.key ? sortDir : null;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={`dp-table__th${col.sortable ? " dp-table__th--sortable" : ""}`}
                    aria-sort={
                      currentDir === "asc"
                        ? "ascending"
                        : currentDir === "desc"
                        ? "descending"
                        : "none"
                    }
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        className="dp-table__sort-btn"
                        onClick={() => handleSort(col.key)}
                        aria-label={`Sort by ${col.label}`}
                      >
                        {col.label}
                        <SortIcon dir={currentDir} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sorted.map((row) => (
              <tr key={row.id} className="dp-table__row">
                <td className="dp-table__td">
                  <div className="dp-table__customer">
                    <div
                      className="dp-table__customer-avatar"
                      aria-hidden="true"
                    >
                      {row.customer
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="dp-table__customer-name">{row.customer}</p>
                      <p className="dp-table__customer-email">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="dp-table__td">
                  <StatusBadge status={row.status} />
                </td>
                <td className="dp-table__td dp-table__td--mono">
                  {row.amount}
                </td>
                <td className="dp-table__td dp-table__td--muted">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
