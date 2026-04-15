"use client";

/**
 * Final CTA — institutional, direct
 */
export function CreceCTA() {
  return (
    <section id="demo" className="relative overflow-hidden bg-[#F4F1EA] py-24 md:py-32">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-amber-700">
          — Siguiente paso
        </div>

        <h2 className="crece-display mb-6 text-balance text-4xl leading-[1.05] tracking-tight text-[#0B1220] md:text-5xl lg:text-6xl">
          Vea el sistema{" "}
          <span className="italic text-amber-700">operando</span>{" "}
          con sus datos.
        </h2>

        <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-slate-700">
          Demo de 30 minutos con un caso real de su organización.
          Sin compromiso. Si no le sirve, se lo decimos nosotros primero.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:contacto@mdconsultoria.ti"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#0B1220] px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-amber-400 transition-all hover:bg-amber-400 hover:text-[#0B1220]"
          >
            Agendar demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h12m0 0L7 1m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 border-b border-slate-600 pb-0.5 font-mono text-sm uppercase tracking-widest text-slate-700 transition-colors hover:border-amber-700 hover:text-amber-700"
          >
            Revisar metodología
          </a>
        </div>

        <div className="mt-16 border-t border-slate-300 pt-8 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          MD Consultoría TI · Ciudad de México · 2026
        </div>
      </div>
    </section>
  );
}
