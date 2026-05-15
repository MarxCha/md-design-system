"use client";

import * as React from "react";
import { Filter, X } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────

interface MobileFilterSheetProps {
  /** Count of active filters */
  activeCount?: number;
  /** Desktop inline content (rendered as-is on desktop) */
  children: React.ReactNode;
  /** Mobile sheet content — stacked filter controls */
  mobileContent?: React.ReactNode;
  /** Title shown in mobile sheet header */
  title?: string;
  /** Called when user taps "Apply" in mobile sheet */
  onApply?: () => void;
  /** Called when user taps "Clear" in mobile sheet */
  onClear?: () => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────

function MobileFilterSheet({
  activeCount = 0,
  children,
  mobileContent,
  title = "Filtros",
  onApply,
  onClear,
  className,
}: MobileFilterSheetProps) {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = React.useState(false);

  // Desktop: render children inline
  if (!isMobile) {
    return (
      <div
        data-slot="filter-bar"
        className={cn("flex flex-wrap items-center gap-3", className)}
      >
        {children}
      </div>
    );
  }

  // Mobile: button + sheet
  return (
    <div data-slot="filter-bar" className={cn("flex items-center gap-2", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="min-h-[44px] gap-2">
            <Filter className="size-4" />
            {title}
            {activeCount > 0 && (
              <Badge variant="default" className="ml-1 size-5 rounded-full p-0 text-xs flex items-center justify-center">
                {activeCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl max-h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4 py-2">
            {mobileContent ?? children}
          </div>
          <SheetFooter className="flex-row gap-2">
            {onClear && (
              <Button
                variant="outline"
                className="flex-1 min-h-[44px]"
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
              >
                <X className="size-4 mr-2" />
                Limpiar
              </Button>
            )}
            {onApply && (
              <Button
                className="flex-1 min-h-[44px]"
                onClick={() => {
                  onApply();
                  setOpen(false);
                }}
              >
                Aplicar
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export { MobileFilterSheet };
export type { MobileFilterSheetProps };
