import Link from "next/link";

const demos = [
  {
    title: "Playground",
    description: "Galeria interactiva de todos los componentes del design system.",
    href: "/playground",
    accent: "bg-primary",
  },
  {
    title: "Scroll Stories",
    description: "Demo de scroll storytelling con escenas animadas, parallax y narrativa.",
    href: "/scroll-stories",
    accent: "bg-secondary",
  },
  {
    title: "Animation Lab",
    description: "Laboratorio de animaciones: presets GSAP, Framer Motion y efectos.",
    href: "/animation-lab",
    accent: "bg-accent",
  },
  {
    title: "Product Showcase",
    description: "Template estilo Apple: scroll cinematogr\u00e1fico, video scrub, parallax y specs.",
    href: "/product-showcase",
    accent: "bg-foreground",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          MD Consultoria TI
        </p>
        <h1 className="mb-6 font-display text-5xl font-black tracking-tight sm:text-6xl">
          Design System
        </h1>
        <p className="mx-auto mb-16 max-w-lg text-lg text-muted-foreground">
          Componentes, hooks y patrones compartidos para CuentosIA, Palabras Vivas,
          y todos los proyectos de MD Consultoria.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-4 h-1.5 w-12 rounded-full ${demo.accent} transition-all duration-300 group-hover:w-20`}
              />
              <p className="mb-2 font-display text-lg font-bold lg:text-xl">{demo.title}</p>
              <p className="text-sm text-muted-foreground">{demo.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-border bg-muted/50 p-8">
          <h3 className="mb-4 font-display text-lg font-semibold">Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-muted-foreground">
            {[
              "Next.js 16",
              "TypeScript",
              "Tailwind 4",
              "GSAP + ScrollTrigger",
              "Lenis",
              "Framer Motion",
              "shadcn/ui",
              "Rive",
              "Howler.js",
              "Three.js + R3F",
              "Lottie",
              "Zustand",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background px-3 py-1.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
