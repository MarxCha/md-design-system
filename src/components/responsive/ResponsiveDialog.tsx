"use client";

import * as React from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ─── Context ──────────────────────────────────────────────

interface ResponsiveDialogContextValue {
  isMobile: boolean;
}

const ResponsiveDialogContext = React.createContext<ResponsiveDialogContextValue>({
  isMobile: false,
});

function useResponsiveDialogContext() {
  return React.useContext(ResponsiveDialogContext);
}

// ─── Root ─────────────────────────────────────────────────

interface ResponsiveDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function ResponsiveDialog({ open, onOpenChange, children }: ResponsiveDialogProps) {
  const { isMobile } = useBreakpoint();

  return (
    <ResponsiveDialogContext.Provider value={{ isMobile }}>
      {isMobile ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          {children}
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      )}
    </ResponsiveDialogContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────

function ResponsiveDialogTrigger({
  className,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { isMobile } = useResponsiveDialogContext();
  const Component = isMobile ? SheetTrigger : DialogTrigger;
  return <Component data-slot="responsive-dialog-trigger" className={className} {...props} />;
}

// ─── Content ──────────────────────────────────────────────

function ResponsiveDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { showCloseButton?: boolean }) {
  const { isMobile } = useResponsiveDialogContext();

  if (isMobile) {
    return (
      <SheetContent
        data-slot="responsive-dialog-content"
        side="bottom"
        className={cn("rounded-t-xl max-h-[85vh] overflow-y-auto", className)}
        {...(props as React.ComponentProps<typeof SheetContent>)}
      >
        {children}
      </SheetContent>
    );
  }

  return (
    <DialogContent
      data-slot="responsive-dialog-content"
      className={className}
      {...(props as React.ComponentProps<typeof DialogContent>)}
    >
      {children}
    </DialogContent>
  );
}

// ─── Header ───────────────────────────────────────────────

function ResponsiveDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isMobile } = useResponsiveDialogContext();
  const Component = isMobile ? SheetHeader : DialogHeader;
  return <Component data-slot="responsive-dialog-header" className={className} {...props} />;
}

// ─── Footer ───────────────────────────────────────────────

function ResponsiveDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isMobile } = useResponsiveDialogContext();
  const Component = isMobile ? SheetFooter : DialogFooter;
  return <Component data-slot="responsive-dialog-footer" className={className} {...props} />;
}

// ─── Title ────────────────────────────────────────────────

function ResponsiveDialogTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  const { isMobile } = useResponsiveDialogContext();
  const Component = isMobile ? SheetTitle : DialogTitle;
  return <Component data-slot="responsive-dialog-title" className={className} {...props} />;
}

// ─── Description ──────────────────────────────────────────

function ResponsiveDialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { isMobile } = useResponsiveDialogContext();
  const Component = isMobile ? SheetDescription : DialogDescription;
  return <Component data-slot="responsive-dialog-description" className={className} {...props} />;
}

// ─── Close ────────────────────────────────────────────────

function ResponsiveDialogClose({
  className,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { isMobile } = useResponsiveDialogContext();
  const Component = isMobile ? SheetClose : DialogClose;
  return <Component data-slot="responsive-dialog-close" className={className} {...props} />;
}

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogClose,
};
