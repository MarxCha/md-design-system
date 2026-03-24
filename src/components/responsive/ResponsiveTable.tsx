"use client";

import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────

interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => React.ReactNode;
  /** Label shown on mobile card. Defaults to header */
  mobileLabel?: string;
  /** 0 = always show, 1+ = collapse on mobile. Default 0 */
  mobilePriority?: number;
  /** Custom render for mobile card */
  mobileRender?: (row: T) => React.ReactNode;
  sortable?: boolean;
  /** Hide this column on mobile entirely */
  hideOnMobile?: boolean;
  className?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingRows?: number;
  className?: string;
  mobileCardClassName?: string;
}

type SortDir = "asc" | "desc" | null;

// ─── Cell Value Helper ────────────────────────────────────

function getCellValue<T>(row: T, col: ColumnDef<T>): React.ReactNode {
  if (col.accessorFn) return col.accessorFn(row);
  if (col.accessorKey) return String(row[col.accessorKey] ?? "");
  return null;
}

// ─── Desktop Table ────────────────────────────────────────

function DesktopTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  actions,
  sortCol,
  sortDir,
  onSort,
  className,
}: ResponsiveTableProps<T> & {
  sortCol: string | null;
  sortDir: SortDir;
  onSort: (colId: string) => void;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.id}
                className={cn(
                  "px-4 py-3 text-left font-medium text-muted-foreground",
                  col.sortable && "cursor-pointer select-none hover:text-foreground",
                  col.className
                )}
                onClick={col.sortable ? () => onSort(col.id) : undefined}
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="inline-flex">
                      {sortCol === col.id ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="size-3.5" />
                        ) : (
                          <ArrowDown className="size-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="size-3.5 opacity-40" />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className={cn(
                "border-b transition-colors hover:bg-muted/50",
                onRowClick && "cursor-pointer"
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.id} className={cn("px-4 py-3", col.className)}>
                  {getCellValue(row, col)}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {actions(row)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Mobile Cards ─────────────────────────────────────────

function MobileCards<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  actions,
  mobileCardClassName,
}: ResponsiveTableProps<T>) {
  const visibleCols = columns.filter(
    (col) => !col.hideOnMobile && (col.mobilePriority ?? 0) === 0
  );

  return (
    <div className="flex flex-col gap-3">
      {data.map((row) => (
        <Card
          key={keyExtractor(row)}
          className={cn(
            "py-4",
            onRowClick && "cursor-pointer active:bg-muted/50",
            mobileCardClassName
          )}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
        >
          <CardContent className="space-y-2 px-4">
            {visibleCols.map((col) => (
              <div key={col.id} className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground shrink-0">
                  {col.mobileLabel ?? col.header}
                </span>
                <span className="text-sm text-right">
                  {col.mobileRender
                    ? col.mobileRender(row)
                    : getCellValue(row, col)}
                </span>
              </div>
            ))}
            {actions && (
              <div className="flex items-center gap-2 pt-2 border-t mt-2">
                {actions(row)}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Loading States ───────────────────────────────────────

function DesktopSkeleton({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b">
              {Array.from({ length: columns }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Card key={i} className="py-4">
          <CardContent className="space-y-3 px-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────

function DefaultEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <p className="text-sm">No hay datos para mostrar</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────

function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  actions,
  emptyState,
  loading = false,
  loadingRows = 5,
  className,
  mobileCardClassName,
}: ResponsiveTableProps<T>) {
  const { isMobile } = useBreakpoint();
  const [sortCol, setSortCol] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>(null);

  const handleSort = (colId: string) => {
    if (sortCol === colId) {
      setSortDir((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(colId);
      setSortDir("asc");
    }
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortCol || !sortDir) return data;
    const col = columns.find((c) => c.id === sortCol);
    if (!col) return data;

    return [...data].sort((a, b) => {
      const aVal = col.accessorKey ? String(a[col.accessorKey] ?? "") : "";
      const bVal = col.accessorKey ? String(b[col.accessorKey] ?? "") : "";
      const cmp = aVal.localeCompare(bVal, "es", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, columns, sortCol, sortDir]);

  // Loading
  if (loading) {
    return isMobile ? (
      <MobileSkeleton rows={loadingRows} />
    ) : (
      <DesktopSkeleton columns={columns.length} rows={loadingRows} />
    );
  }

  // Empty
  if (data.length === 0) {
    return <>{emptyState ?? <DefaultEmptyState />}</>;
  }

  // Render
  if (isMobile) {
    return (
      <MobileCards
        data={sortedData}
        columns={columns}
        keyExtractor={keyExtractor}
        onRowClick={onRowClick}
        actions={actions}
        mobileCardClassName={mobileCardClassName}
      />
    );
  }

  return (
    <DesktopTable
      data={sortedData}
      columns={columns}
      keyExtractor={keyExtractor}
      onRowClick={onRowClick}
      actions={actions}
      sortCol={sortCol}
      sortDir={sortDir}
      onSort={handleSort}
      className={className}
    />
  );
}

export { ResponsiveTable };
export type { ColumnDef, ResponsiveTableProps };
