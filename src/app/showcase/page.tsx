"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Copy,
  Mail,
  Moon,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ============================================================
   Section wrapper
   ============================================================ */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="font-display text-[length:var(--font-size-2xl)] font-bold tracking-tight text-[hsl(var(--foreground))]">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/* ============================================================
   Showcase Page
   ============================================================ */
export default function ShowcasePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  function toggleDark() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/0.95] backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                <span className="font-display text-sm font-bold">MD</span>
              </div>
              <div>
                <h1 className="font-display text-lg font-bold leading-tight">
                  Component Showcase
                </h1>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  MD Design System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleDark}>
                    {darkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle dark mode</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-6xl space-y-16 px-6 py-12">
          {/* ── Buttons ── */}
          <Section title="Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button>
                <Mail className="mr-2 h-4 w-4" /> With Icon
              </Button>
            </div>
          </Section>

          <Separator />

          {/* ── Badges ── */}
          <Section title="Badges">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Section>

          <Separator />

          {/* ── Cards ── */}
          <Section title="Cards">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>CuentosIA</CardTitle>
                  <CardDescription>
                    Generación de cuentos infantiles con IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Cuentos personalizados con narración de voz, ilustraciones
                    generadas y experiencia interactiva.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">React Native</Badge>
                  <Button size="sm">Ver más</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Palabras Vivas</CardTitle>
                  <CardDescription>
                    Libros interactivos con scroll cinematográfico
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Experiencias de lectura inmersivas con parallax, audio
                    sincronizado y animaciones.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">Next.js</Badge>
                  <Button size="sm" variant="outline">
                    Explorar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HIDROS</CardTitle>
                  <CardDescription>
                    Dashboard de distritos de riego
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Monitoreo hidrológico con mapas interactivos, KPIs en tiempo
                    real y alertas.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">Django + React</Badge>
                  <Button size="sm" variant="outline">
                    Dashboard
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Section>

          <Separator />

          {/* ── Form Controls ── */}
          <Section title="Form Controls">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Proyecto</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cuentosia">CuentosIA</SelectItem>
                      <SelectItem value="palabras">Palabras Vivas</SelectItem>
                      <SelectItem value="hidros">HIDROS</SelectItem>
                      <SelectItem value="agro">AgroRentable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe tu requerimiento..."
                    rows={5}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={switchOn}
                    onCheckedChange={setSwitchOn}
                  />
                  <Label>Notificaciones activas</Label>
                </div>
                <Button className="w-full">Enviar</Button>
              </div>
            </div>
          </Section>

          <Separator />

          {/* ── Dialog ── */}
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Abrir diálogo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar acción</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas continuar? Esta acción no se
                    puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button>Confirmar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Separator />

          {/* ── Dropdown ── */}
          <Section title="Dropdown Menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Opciones <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" /> Copiar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Configurar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[hsl(var(--destructive))]">
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          <Separator />

          {/* ── Tabs ── */}
          <Section title="Tabs">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                      Vista general del proyecto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">47</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Source files
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">20</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          UI Components
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">7</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Custom Hooks
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      Métricas de uso y performance del design system.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      Configuración de tokens y temas.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Section>

          <Separator />

          {/* ── Sheet ── */}
          <Section title="Sheet">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Abrir panel lateral</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navegación</SheetTitle>
                  <SheetDescription>
                    Explora las secciones del design system
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-6 space-y-2">
                  {[
                    "Tokens",
                    "Components",
                    "Hooks",
                    "Animations",
                    "3D Scenes",
                  ].map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {item}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </Section>

          <Separator />

          {/* ── Avatar ── */}
          <Section title="Avatars">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </Section>

          <Separator />

          {/* ── Skeleton ── */}
          <Section title="Skeleton (Loading States)">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </CardContent>
            </Card>
          </Section>

          <Separator />

          {/* ── Scroll Area ── */}
          <Section title="Scroll Area">
            <ScrollArea className="h-48 w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] p-4">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))]">
                      <span className="text-xs font-medium">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Item #{i + 1}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Elemento de ejemplo en scroll area
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Section>

          <Separator />

          {/* ── Tooltips ── */}
          <Section title="Tooltips">
            <div className="flex items-center gap-4">
              {[
                { icon: Bell, label: "Notificaciones" },
                { icon: Star, label: "Favoritos" },
                { icon: Search, label: "Buscar" },
                { icon: Settings, label: "Configuración" },
              ].map(({ icon: Icon, label }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </Section>

          {/* ── Design Tokens ── */}
          <Separator />
          <Section title="Design Tokens">
            <div className="space-y-6">
              {/* Colors */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  Colors
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {[
                    { name: "Primary", var: "--primary" },
                    { name: "Secondary", var: "--secondary" },
                    { name: "Accent", var: "--accent" },
                    { name: "Destructive", var: "--destructive" },
                    { name: "Muted", var: "--muted" },
                    { name: "Background", var: "--background" },
                  ].map(({ name, var: cssVar }) => (
                    <div key={cssVar} className="space-y-1.5">
                      <div
                        className="h-16 rounded-[var(--radius-md)] border border-[hsl(var(--border))]"
                        style={{
                          backgroundColor: `hsl(var(${cssVar}))`,
                        }}
                      />
                      <p className="text-xs font-medium">{name}</p>
                      <p className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                        var({cssVar})
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  Typography Scale
                </h3>
                <div className="space-y-2">
                  {[
                    { size: "4xl", label: "Display" },
                    { size: "3xl", label: "H2" },
                    { size: "2xl", label: "H3" },
                    { size: "xl", label: "H4" },
                    { size: "lg", label: "H5" },
                    { size: "base", label: "Body" },
                    { size: "sm", label: "Small" },
                    { size: "xs", label: "Caption" },
                  ].map(({ size, label }) => (
                    <div key={size} className="flex items-baseline gap-4">
                      <span className="w-16 shrink-0 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                        {size}
                      </span>
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: `var(--font-size-${size})`,
                        }}
                      >
                        {label} — Instrument Sans
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  Spacing Scale (4px base)
                </h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 6, 8, 12, 16, 24].map((n) => (
                    <div key={n} className="flex items-center gap-4">
                      <span className="w-8 shrink-0 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                        {n}
                      </span>
                      <div
                        className="h-4 rounded-sm bg-[hsl(var(--primary))]"
                        style={{
                          width: `var(--spacing-${n})`,
                        }}
                      />
                      <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                        {n * 4}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  Border Radius
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["sm", "md", "lg", "xl", "2xl", "full"].map((r) => (
                    <div key={r} className="space-y-1.5 text-center">
                      <div
                        className="mx-auto h-16 w-16 border-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                        style={{
                          borderRadius: `var(--radius-${r})`,
                        }}
                      />
                      <p className="font-mono text-xs">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[hsl(var(--border))] py-8">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              MD Design System v0.1.0 — MD Consultoría TI
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
