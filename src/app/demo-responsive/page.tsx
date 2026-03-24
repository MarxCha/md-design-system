"use client";

import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  ResponsiveTable,
  type ColumnDef,
} from "@/components/responsive/ResponsiveTable";
import { FormGrid, FormField } from "@/components/responsive/FormGrid";
import { MobileFilterSheet } from "@/components/responsive/MobileFilterSheet";
import {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
} from "@/components/responsive/ResponsiveDialog";
import { TouchActionBar, type TouchAction } from "@/components/responsive/TouchActionBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Filter, Download, Eye } from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────

interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  status: "active" | "inactive" | "pending";
  lastVisit: string;
}

const patients: Patient[] = [
  { id: "PAC-001", name: "Antonio Rodriguez", email: "antonio@email.com", age: 45, phone: "+52 33 1234 5678", status: "active", lastVisit: "2026-03-20" },
  { id: "PAC-002", name: "Fernanda Martinez", email: "fernanda@email.com", age: 32, phone: "+52 55 8765 4321", status: "active", lastVisit: "2026-03-18" },
  { id: "PAC-003", name: "Tomas Gonzalez", email: "tomas@email.com", age: 58, phone: "+52 81 2345 6789", status: "inactive", lastVisit: "2026-02-15" },
  { id: "PAC-004", name: "Laura Sanchez", email: "laura@email.com", age: 27, phone: "+52 33 9876 5432", status: "pending", lastVisit: "2026-03-22" },
  { id: "PAC-005", name: "Ricardo Lopez", email: "ricardo@email.com", age: 63, phone: "+52 55 1122 3344", status: "active", lastVisit: "2026-03-21" },
  { id: "PAC-006", name: "Maria Elena Ruiz", email: "maria@email.com", age: 41, phone: "+52 81 5566 7788", status: "active", lastVisit: "2026-03-19" },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
  pending: "bg-amber-100 text-amber-700",
};

const statusLabels: Record<string, string> = {
  active: "Activo",
  inactive: "Inactivo",
  pending: "Pendiente",
};

// ─── Column Definitions ───────────────────────────────────

const columns: ColumnDef<Patient>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
    mobileLabel: "ID",
    mobilePriority: 1,
    hideOnMobile: true,
    className: "font-mono text-xs",
  },
  {
    id: "name",
    header: "Paciente",
    accessorKey: "name",
    sortable: true,
    mobileLabel: "Paciente",
    mobilePriority: 0,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    hideOnMobile: true,
  },
  {
    id: "age",
    header: "Edad",
    accessorKey: "age",
    sortable: true,
    mobileLabel: "Edad",
    mobilePriority: 0,
    mobileRender: (row) => `${row.age} años`,
  },
  {
    id: "phone",
    header: "Teléfono",
    accessorKey: "phone",
    mobileLabel: "Tel",
    mobilePriority: 0,
  },
  {
    id: "status",
    header: "Estado",
    accessorKey: "status",
    sortable: true,
    mobileLabel: "Estado",
    mobilePriority: 0,
    accessorFn: (row) => (
      <Badge variant="secondary" className={statusColors[row.status]}>
        {statusLabels[row.status]}
      </Badge>
    ),
    mobileRender: (row) => (
      <Badge variant="secondary" className={statusColors[row.status]}>
        {statusLabels[row.status]}
      </Badge>
    ),
  },
  {
    id: "lastVisit",
    header: "Última visita",
    accessorKey: "lastVisit",
    sortable: true,
    mobileLabel: "Última visita",
    mobilePriority: 0,
  },
];

// ─── Page Component ───────────────────────────────────────

export default function DemoResponsivePage() {
  const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const activeFilterCount =
    (statusFilter !== "all" ? 1 : 0) + (searchFilter ? 1 : 0);

  const filteredPatients = patients.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (searchFilter && !p.name.toLowerCase().includes(searchFilter.toLowerCase()))
      return false;
    return true;
  });

  const touchActions: TouchAction[] = [
    { id: "new", label: "Nuevo", icon: Plus, onClick: () => {} },
    { id: "filter", label: "Filtrar", icon: Filter, onClick: () => {}, variant: "outline" },
    { id: "export", label: "Exportar", icon: Download, onClick: () => {}, variant: "outline" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Responsive Primitives
          </h1>
          <p className="text-muted-foreground mt-1">
            Componentes que adaptan su layout según el viewport
          </p>
          <div className="mt-3 flex gap-2">
            <Badge variant={isMobile ? "default" : "secondary"}>
              {breakpoint}
            </Badge>
            <Badge variant="outline">
              {isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}
            </Badge>
          </div>
        </div>

        {/* 1. ResponsiveTable + MobileFilterSheet */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">ResponsiveTable + MobileFilterSheet</h2>
          <p className="text-sm text-muted-foreground">
            Desktop: tabla con sorting. Mobile: cards apiladas. Filtros colapsan a Sheet en mobile.
          </p>

          <MobileFilterSheet
            activeCount={activeFilterCount}
            onApply={() => {}}
            onClear={() => {
              setStatusFilter("all");
              setSearchFilter("");
            }}
            mobileContent={
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Buscar paciente</Label>
                  <Input
                    placeholder="Nombre..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            }
          >
            <Input
              placeholder="Buscar paciente..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </MobileFilterSheet>

          <ResponsiveTable
            data={filteredPatients}
            columns={columns}
            keyExtractor={(row) => row.id}
            onRowClick={(row) => alert(`Clicked: ${row.name}`)}
            actions={(row) => (
              <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
                <Eye className="size-4" />
              </Button>
            )}
          />
        </section>

        {/* 2. FormGrid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">FormGrid</h2>
          <p className="text-sm text-muted-foreground">
            1 col mobile → 2 cols tablet → 3 cols desktop. Los campos pueden expandirse.
          </p>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Nueva Consulta</h3>
            <FormGrid columns={{ sm: 1, md: 2, lg: 3 }}>
              <FormField>
                <Label>Paciente</Label>
                <Input placeholder="Buscar por nombre, CURP..." className="min-h-[44px]" />
              </FormField>
              <FormField>
                <Label>Tipo de Consulta</Label>
                <Select>
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="specialty">Especialidad</SelectItem>
                    <SelectItem value="followup">Seguimiento</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField>
                <Label>Motivo</Label>
                <Input placeholder="Motivo de consulta" className="min-h-[44px]" />
              </FormField>
              <FormField span={{ md: 2, lg: 3 }}>
                <Label>Notas SOAP — Subjetivo</Label>
                <textarea
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[100px] resize-y"
                  placeholder="Síntomas referidos por el paciente..."
                />
              </FormField>
              <FormField>
                <Label>Presión arterial</Label>
                <Input placeholder="120/80" className="min-h-[44px]" />
              </FormField>
              <FormField>
                <Label>FC (lpm)</Label>
                <Input placeholder="72" type="number" className="min-h-[44px]" />
              </FormField>
              <FormField>
                <Label>Temperatura (°C)</Label>
                <Input placeholder="36.5" type="number" className="min-h-[44px]" />
              </FormField>
            </FormGrid>
          </div>
        </section>

        {/* 3. ResponsiveDialog */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">ResponsiveDialog</h2>
          <p className="text-sm text-muted-foreground">
            Desktop: Dialog centrado. Mobile: Bottom Sheet con swipe-to-dismiss.
          </p>

          <ResponsiveDialog>
            <ResponsiveDialogTrigger asChild>
              <Button>Confirmar Cita</Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>Confirmar Cita</ResponsiveDialogTitle>
                <ResponsiveDialogDescription>
                  Se confirmará la cita de Antonio Rodriguez para el 25 de marzo a las 10:00 AM.
                </ResponsiveDialogDescription>
              </ResponsiveDialogHeader>
              <div className="space-y-3 py-4 px-4 md:px-0">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Paciente</span>
                  <span className="text-sm font-medium">Antonio Rodriguez</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fecha</span>
                  <span className="text-sm font-medium">25/03/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hora</span>
                  <span className="text-sm font-medium">10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tipo</span>
                  <span className="text-sm font-medium">Consulta General</span>
                </div>
              </div>
              <ResponsiveDialogFooter>
                <Button variant="outline" className="min-h-[44px]">Cancelar</Button>
                <Button className="min-h-[44px]">Confirmar</Button>
              </ResponsiveDialogFooter>
            </ResponsiveDialogContent>
          </ResponsiveDialog>
        </section>

        {/* 4. TouchActionBar */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">TouchActionBar</h2>
          <p className="text-sm text-muted-foreground">
            Barra flotante de acciones solo visible en mobile. Resize el navegador para verla.
          </p>
          {isDesktop && (
            <p className="text-xs text-muted-foreground italic">
              (Reduce el viewport a &lt;768px para ver el TouchActionBar)
            </p>
          )}
        </section>

        <TouchActionBar actions={touchActions} />
      </div>
    </div>
  );
}
