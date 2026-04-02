"use client";

import { useState, useMemo, useCallback } from "react";

// ============================================================
// Inline-styled GPC Engine Playground
// Based on CEO-approved HTML prototype (gpc_ux_mejorada_neuropatia.html)
// Uses inline styles to avoid Tailwind v3/v4 compatibility issues
// ============================================================

const C = {
  bg: "#f8f9fa", bgCard: "#ffffff", border: "#e5e7eb", borderLight: "#f0f0f0",
  text: "#1a1a1a", textSec: "#6b7280", textMuted: "#9ca3af",
  primary: "#1a2b3a",
  safe: "#0F6E56", safeBg: "#E1F5EE",
  warn: "#A32D2D", warnBg: "#FCEBEB",
  caution: "#BA7517", cautionBg: "#FFF8E6",
  blue: "#185FA5", blueBg: "#EFF6FF",
  green: "#0F6E56", greenBg: "#E1F5EE",
  amber: "#BA7517", amberBg: "#FFF8E6",
  violet: "#534AB7", violetBg: "#EEEDFE",
  red: "#A32D2D", redBg: "#FCEBEB",
};

interface Drug {
  id: string; name: string; cls: string; dose: string; eff: string;
  ci: string; onset: string; avail: string; adv: string;
  safe: boolean; note: string;
}

const DRUGS: Drug[] = [
  { id: "preg", name: "Pregabalina", cls: "AA2", dose: "300–600 mg/día", eff: "39–46%", ci: "IR severa (Cr > 1.5)", onset: "1–2 sem", avail: "Cuadro básico", adv: "Somnolencia, Mareo, Edema", safe: true, note: "Cr 1.1 mg/dL → dosis estándar OK" },
  { id: "gaba", name: "Gabapentina", cls: "AA2", dose: "900–3600 mg/día", eff: "35–45%", ci: "IR severa (Cr > 1.5)", onset: "1–2 sem", avail: "Cuadro básico", adv: "Somnolencia, Ataxia, Mareo", safe: true, note: "Alternativa económica. Titulación más gradual." },
  { id: "ami", name: "Amitriptilina", cls: "ATC", dose: "25–150 mg/día", eff: "30–40%", ci: "Cardiopatía, Glaucoma, Epilepsia", onset: "2–4 sem", avail: "Cuadro básico", adv: "Sedación, Boca seca, Ret. urinaria", safe: true, note: "Sin cardiopatía → apto. Usar dosis baja nocturna." },
  { id: "dulo", name: "Duloxetina", cls: "ISRSN", dose: "60–120 mg/día", eff: "36–41%", ci: "HAS no controlada", onset: "2–4 sem", avail: "Limitada", adv: "Náusea, Insomnio, Mareo", safe: false, note: "PA 148/92 mmHg → contraindicación relativa en este paciente." },
];

const TREE = [
  { label: "Inicio", sub: "Paciente con NDD" },
  { label: "Control glucémico", sub: "Permanente e integral" },
  { label: "Contraindicaciones", sub: "Evaluar perfil" },
  { label: "Tratamiento", sub: "Monoterapia" },
  { label: "Seguimiento", sub: "Plan de monitoreo" },
  { label: "Cierre de caso", sub: "Acción post-algoritmo" },
  { label: "Visita 2", sub: "Reanudación de seguimiento" },
];

const STEP_COLORS = [C.blue, C.green, C.amber, C.violet, C.green, C.blue, C.green];

// Max logical step for progress bar (step 6 is a sim, treat 5 as the real end)
const TOTAL_STEPS = 5;

// ============================================================

export default function GPCEnginePage() {
  const [step, setStep] = useState(0);
  const [ci, setCi] = useState<string | null>(null);
  const [drug, setDrug] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "table">("list");
  const [open, setOpen] = useState<string | null>("preg");
  const [copied, setCopied] = useState(false);

  // Step 5 — cierre
  const [closeAction, setCloseAction] = useState<"followup" | "close" | null>(null);
  const [followupConfirmed, setFollowupConfirmed] = useState(false);
  const [closeMotive, setCloseMotive] = useState("");
  const [closeNote, setCloseNote] = useState("");
  const [caseClosed, setCaseClosed] = useState(false);

  // Step 6 — visita 2
  const [v2Pain, setV2Pain] = useState(5);
  const [v2Adherence, setV2Adherence] = useState<"buena" | "parcial" | "pobre" | null>(null);
  const [v2Control, setV2Control] = useState<"si" | "no" | null>(null);

  const go = useCallback((s: number, opts?: { ci?: string | null; drug?: string | null }) => {
    setStep(s);
    if (opts?.ci !== undefined) setCi(opts.ci);
    if (opts?.drug !== undefined) setDrug(opts.drug);
  }, []);

  const reset = useCallback(() => {
    setStep(0); setCi(null); setDrug(null); setView("list"); setOpen("preg");
    setCloseAction(null); setFollowupConfirmed(false);
    setCloseMotive(""); setCloseNote(""); setCaseClosed(false);
    setV2Pain(5); setV2Adherence(null); setV2Control(null);
  }, []);

  const pct = Math.round((Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100);

  const note = useMemo(() => {
    const today = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
    let n = `GPC SSA-010-08\nNeuropatía periférica diabética\nFecha: ${today}\n\nPlan:`;
    if (step >= 1) n += `\n\n1. Control glucémico [Grado B]\n   HbA1c objetivo < 7%\n   Dieta + ejercicio + apego`;
    if (step >= 2 && ci) n += `\n\n2. Contraindicaciones\n   → ${ci === "no" ? "Sin contraindicaciones AA2/ATC/ISRSN" : "Contraindicaciones presentes"}`;
    if (step >= 3 && ci === "no") {
      const d = DRUGS.find(x => x.id === drug);
      n += `\n\n3. Monoterapia [Evidencia I]${d ? `\n   ${d.name} ${d.dose}\n   Revisión 4 semanas` : "\n   (por definir)"}`;
    }
    if (step >= 3 && ci === "si") n += `\n\n3. Referencia nivel 2\n   Motivo: CI múltiples\n   → Opiáceos bajo supervisión`;
    if (step >= 4) n += `\n\n4. Seguimiento\n   Revisión: 4 semanas\n   HbA1c control: 3 meses`;
    if (step >= 5) {
      if (followupConfirmed) n += `\n\n5. Cierre de visita\n   Acción: Seguimiento programado (4 semanas)\n   Tarea asignada a secretaria`;
      else if (caseClosed) n += `\n\n5. Cierre de caso\n   Motivo: ${closeMotive || "(sin especificar)"}\n   Nota: ${closeNote || "—"}\n   Estado: Caso cerrado`;
    }
    if (step >= 6) {
      const d = DRUGS.find(x => x.id === drug);
      n += `\n\n6. Visita 2 — Seguimiento GPC\n   Medicamento previo: ${d?.name ?? "—"} ${d?.dose ?? ""}\n   Dolor actual: ${v2Pain}/10\n   Adherencia: ${v2Adherence ?? "no registrada"}`;
      if (v2Control === "si") n += `\n   Control ≥50%: Sí → Cierre de caso exitoso`;
      if (v2Control === "no") n += `\n   Control ≥50%: No → Continuar algoritmo / referir`;
    }
    return n;
  }, [step, ci, drug, followupConfirmed, caseClosed, closeMotive, closeNote, v2Pain, v2Adherence, v2Control]);

  const copyNote = useCallback(() => {
    navigator.clipboard.writeText(note).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [note]);

  // ---- Styles ----
  const s = {
    page: { minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text, fontSize: 13 } as const,
    header: { background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: "9px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" } as const,
    body: { display: "flex", minHeight: "calc(100vh - 42px)" } as const,
    sidebar: { width: 256, minWidth: 256, background: C.bgCard, borderRight: `1px solid ${C.border}`, padding: 14, display: "flex", flexDirection: "column" as const, gap: 14, overflowY: "auto" as const },
    main: { flex: 1, padding: "20px 26px", overflowY: "auto" as const },
    notePanel: { width: 260, minWidth: 260, background: C.bgCard, borderLeft: `1px solid ${C.border}`, padding: 14, display: "flex", flexDirection: "column" as const },
    card: { background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 } as const,
    btnP: { display: "block", width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "center" as const },
    btnG: { display: "inline-block", background: "transparent", color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, cursor: "pointer" },
    pill: { display: "inline-flex", alignItems: "center" as const, fontSize: 11, padding: "2px 8px", borderRadius: 100, fontWeight: 500 },
    lbl: { fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.textSec, margin: "0 0 7px" },
  };

  // ---- Step Content Renderers ----

  function StepCard({ type, color, title, children, footer }: {
    type: string; color: string; title: string; children: React.ReactNode; footer: React.ReactNode;
  }) {
    return (
      <div style={{ ...s.card, borderLeft: `3px solid ${color}`, padding: "14px 14px 14px 18px", marginBottom: 10 }}>
        <p style={{ ...s.lbl, color, margin: "0 0 3px" }}>{type}</p>
        <h3 style={{ fontSize: 15, fontWeight: 500, margin: "0 0 12px" }}>{title}</h3>
        {children}
        <div style={{ marginTop: 12 }}>{footer}</div>
      </div>
    );
  }

  function renderStep() {
    if (step === 0) return (
      <StepCard type="Inicio" color={C.blue} title="Paciente con neuropatía diabética dolorosa"
        footer={<button style={s.btnP} onClick={() => go(1)}>Continuar →</button>}>
        <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 10px", lineHeight: 1.6 }}>
          Paciente mayor de 18 años con DM y dolor neuropático: quemante, cortante, calambres, hiperalgesia, predominio nocturno.
        </p>
        <div style={{ background: C.blueBg, borderRadius: 8, padding: 9, fontSize: 12, color: C.blue }}>
          Esta GPC aplica al primer nivel. Si el diagnóstico no está confirmado, referir para evaluación neurológica.
        </div>
      </StepCard>
    );

    if (step === 1) return (
      <StepCard type="Acción" color={C.green} title="Control glucémico permanente"
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <button style={s.btnP} onClick={() => go(2)}>Continuar →</button>
            <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => go(0)}>← Paso anterior</button>
          </div>
        }>
        <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 10px", lineHeight: 1.6 }}>
          Control glucémico estricto. Objetivo HbA1c &lt; 7%. Manejar HAS, dislipidemia, obesidad, tabaquismo, depresión e insomnio.
        </p>
        <div style={{ background: C.warnBg, borderRadius: 8, padding: 9, fontSize: 12, color: C.warn, marginBottom: 10 }}>
          ⚠ Paciente: HbA1c 9.2% — requiere intensificación del control antes de iniciar manejo del dolor.
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <span style={{ ...s.pill, background: C.greenBg, color: C.green }}>Grado B</span>
          <span style={{ ...s.pill, background: C.bg, color: C.textSec }}>GPC pág 14 · Boulton AJM 2005</span>
        </div>
      </StepCard>
    );

    if (step === 2) return (
      <StepCard type="Decisión clínica" color={C.amber} title="Verificar contraindicaciones farmacológicas"
        footer={
          <div>
            <div style={{ display: "flex", gap: 7, marginBottom: 7 }}>
              <button style={{ ...s.btnG, flex: 1, textAlign: "center" }} onClick={() => go(3, { ci: "no" })}>Sin contraindicaciones →</button>
              <button style={{ ...s.btnG, flex: 1, textAlign: "center", borderColor: C.warn, color: C.warn }} onClick={() => go(3, { ci: "si" })}>Hay contraindicaciones →</button>
            </div>
            <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => go(1)}>← Paso anterior</button>
          </div>
        }>
        <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 11px" }}>¿Existen contraindicaciones para manejo con AA2, ATC o ISRSN?</p>
        <div style={{ background: C.bg, borderRadius: 8, padding: 11, marginBottom: 11, fontSize: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3px 12px", marginBottom: 10 }}>
            <span style={{ fontWeight: 500, color: C.caution }}>ATC</span><span style={{ color: C.textSec }}>Cardiopatía isquémica, epilepsia, glaucoma</span>
            <span style={{ fontWeight: 500, color: C.caution }}>AA2</span><span style={{ color: C.textSec }}>IR severa (Cr &gt; 1.5 mg/dL)</span>
            <span style={{ fontWeight: 500, color: C.caution }}>ISRSN</span><span style={{ color: C.textSec }}>HAS no controlada</span>
          </div>
          <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 9 }}>
            <p style={{ margin: "0 0 5px", fontSize: 11, fontWeight: 500, color: C.textSec }}>Perfil del paciente actual</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11 }}>
              <span style={{ color: C.safe }}>✓ Sin cardiopatía</span>
              <span style={{ color: C.safe }}>✓ Sin epilepsia/glaucoma</span>
              <span style={{ color: C.safe }}>✓ Cr 1.1 OK</span>
              <span style={{ color: C.warn }}>⚠ PA 148/92 mmHg</span>
            </div>
          </div>
        </div>
      </StepCard>
    );

    if (step === 3 && ci === "si") return (
      <StepCard type="Referencia — Nivel 2" color={C.red} title="Referir al especialista"
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <button style={s.btnP} onClick={reset}>↺ Reiniciar algoritmo</button>
            <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => go(2, { ci: null })}>← Paso anterior</button>
          </div>
        }>
        <div style={{ background: C.warnBg, borderRadius: 8, padding: 11, marginBottom: 11, fontSize: 13, lineHeight: 1.6 }}>
          <p style={{ margin: "0 0 5px" }}><span style={{ fontWeight: 500, color: C.red }}>Especialista: </span><span style={{ color: C.textSec }}>Segundo o tercer nivel — agonistas opiáceos bajo supervisión</span></p>
          <p style={{ margin: 0 }}><span style={{ fontWeight: 500, color: C.red }}>Motivo: </span><span style={{ color: C.textSec }}>Contraindicaciones para los tres grupos de primera línea</span></p>
        </div>
        <p style={{ fontSize: 11, color: C.textSec, margin: 0 }}>GPC SSA-010-08, Algoritmo pág 21</p>
      </StepCard>
    );

    if (step === 3 && ci === "no") {
      const tog = (
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <button style={{ ...s.btnG, ...(view === "list" ? { background: C.primary, color: "#fff", borderColor: C.primary } : {}) }} onClick={() => setView("list")}>Lista</button>
          <button style={{ ...s.btnG, ...(view === "table" ? { background: C.primary, color: "#fff", borderColor: C.primary } : {}) }} onClick={() => setView("table")}>Comparar</button>
        </div>
      );

      const drugList = view === "list" ? (
        <div>
          {DRUGS.map(d => {
            const isO = open === d.id;
            const isC = drug === d.id;
            return (
              <div key={d.id} style={{ border: `1px solid ${isC ? C.primary : C.border}`, borderRadius: 8, padding: 11, marginBottom: 7, cursor: "pointer" }}>
                <div onClick={() => setOpen(isO ? null : d.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>{d.name}</p><p style={{ margin: 0, fontSize: 11, color: C.textSec }}>{d.cls}</p></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: d.safe ? C.safe : C.caution }}>{d.safe ? "✓ Apto" : "⚠ Precaución"}</span>
                    <span style={{ color: C.textSec }}>{isO ? "∧" : "∨"}</span>
                  </div>
                </div>
                {isO && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.borderLight}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, fontSize: 12, marginBottom: 9 }}>
                      <span><span style={{ color: C.textSec }}>Dosis: </span>{d.dose}</span>
                      <span><span style={{ color: C.textSec }}>Eficacia: </span>{d.eff}</span>
                      <span><span style={{ color: C.textSec }}>Inicio: </span>{d.onset}</span>
                      <span><span style={{ color: C.textSec }}>Disponible: </span>{d.avail}</span>
                    </div>
                    <p style={{ fontSize: 12, margin: "0 0 4px" }}><span style={{ color: C.warn }}>CI: </span><span style={{ color: C.textSec }}>{d.ci}</span></p>
                    <p style={{ fontSize: 12, margin: "0 0 9px", color: C.textSec }}>EA: {d.adv}</p>
                    <div style={{ background: C.bg, borderRadius: 6, padding: 8, fontSize: 11, color: d.safe ? C.safe : C.caution, marginBottom: 9 }}>{d.note}</div>
                    <button style={{ ...s.btnP, fontSize: 12, padding: 9 }} onClick={() => setDrug(d.id)}>
                      {drug === d.id ? "✓ Seleccionado" : "Seleccionar este medicamento"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ overflowX: "auto", marginBottom: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Medicamento", "Dosis", "Eficacia", "CI", "Inicio", "Paciente", ""].map(h => <th key={h} style={{ padding: "6px 8px", textAlign: "left", borderBottom: `1px solid ${C.border}`, fontSize: 10, fontWeight: 500, color: C.textSec }}>{h}</th>)}</tr></thead>
            <tbody>{DRUGS.map(d => (
              <tr key={d.id} style={{ background: drug === d.id ? C.bg : "transparent" }}>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}`, fontSize: 12 }}><p style={{ margin: 0, fontWeight: 500 }}>{d.name}</p><p style={{ margin: 0, fontSize: 10, color: C.textSec }}>{d.cls}</p></td>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}`, fontSize: 12 }}>{d.dose}</td>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}`, fontSize: 12 }}>{d.eff}</td>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}`, fontSize: 11, color: C.textSec }}>{d.ci}</td>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}`, fontSize: 12 }}>{d.onset}</td>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}` }}><span style={{ fontSize: 11, fontWeight: 500, color: d.safe ? C.safe : C.caution }}>{d.safe ? "✓ Apto" : "⚠ Precaución"}</span></td>
                <td style={{ padding: "6px 8px", borderBottom: `1px solid ${C.borderLight}` }}>
                  <button style={{ ...s.btnG, fontSize: 11, padding: "4px 10px", ...(drug === d.id ? { background: C.primary, color: "#fff", borderColor: C.primary } : {}) }} onClick={() => setDrug(d.id)}>
                    {drug === d.id ? "✓" : "Elegir"}
                  </button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      );

      return (
        <StepCard type="Tratamiento" color={C.violet} title="Monoterapia — Elegir medicamento"
          footer={
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <button style={{ ...s.btnP, ...(drug ? {} : { opacity: 0.45, cursor: "not-allowed" }) }} onClick={() => drug && go(4)}>
                {drug ? "Continuar →" : "Selecciona un medicamento para continuar"}
              </button>
              <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => go(2, { ci: null })}>← Paso anterior</button>
            </div>
          }>
          <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 12px", fontStyle: "italic" }}>Iniciar con uno de los tres grupos de primera línea. Son intercambiables; elegir según perfil del paciente.</p>
          {tog}
          {drugList}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
            <span style={{ ...s.pill, background: C.violetBg, color: C.violet }}>Evidencia I</span>
            <span style={{ ...s.pill, background: C.bg, color: C.textSec }}>GPC pág 16-18 · Jensen TS 2006</span>
          </div>
        </StepCard>
      );
    }

    if (step === 4) {
      const d = DRUGS.find(x => x.id === drug);
      return (
        <StepCard type="Seguimiento" color={C.green} title="Programar revisión"
          footer={
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <button style={s.btnP} onClick={() => go(5)}>Continuar al cierre →</button>
              <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => go(3)}>← Paso anterior</button>
            </div>
          }>
          <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 12px" }}>
            Inicio de <strong style={{ color: C.text }}>{d?.name ?? "—"}</strong> ({d?.dose ?? "—"}). Citar a las 4 semanas para evaluar eficacia y tolerancia.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 }}>
            {[
              { label: "Primera revisión", value: "4 semanas" },
              { label: "Control HbA1c", value: "3 meses" },
              { label: "Meta analgésica", value: "≥ 50% reducción" },
              { label: "Sin respuesta → referir", value: "Nivel 2" },
            ].map(item => (
              <div key={item.label} style={{ background: C.bg, borderRadius: 8, padding: 9 }}>
                <p style={{ margin: 0, fontSize: 11, color: C.textSec }}>{item.label}</p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: C.greenBg, borderRadius: 8, padding: 9, fontSize: 12, color: C.green }}>
            ✓ Algoritmo completado. Nota médica lista en el panel derecho.
          </div>
        </StepCard>
      );
    }

    // ---- Step 5: Cierre de caso ----
    if (step === 5) {
      const d = DRUGS.find(x => x.id === drug);

      // Confirmed follow-up
      if (followupConfirmed) return (
        <StepCard type="Cierre de visita" color={C.blue} title="Seguimiento programado"
          footer={
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <button style={s.btnP} onClick={() => go(6)}>Simular visita 2 →</button>
              <button style={{ ...s.btnP, background: C.textSec }} onClick={reset}>↺ Nuevo paciente</button>
            </div>
          }>
          <div style={{ background: C.greenBg, borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 500, color: C.green }}>✓ Tarea creada para secretaria</p>
            <p style={{ margin: 0, fontSize: 12, color: C.textSec }}>
              Cita de seguimiento programada en 4 semanas para Juan M.
            </p>
          </div>
          <div style={{ background: C.bg, borderRadius: 8, padding: 10, fontSize: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px" }}>
              <span style={{ color: C.textSec }}>Medicamento:</span><span style={{ fontWeight: 500 }}>{d?.name ?? "—"} {d?.dose ?? ""}</span>
              <span style={{ color: C.textSec }}>Próxima cita:</span><span style={{ fontWeight: 500 }}>4 semanas</span>
              <span style={{ color: C.textSec }}>Recordatorio:</span><span style={{ fontWeight: 500 }}>Activado (WhatsApp + email)</span>
            </div>
          </div>
        </StepCard>
      );

      // Case closed
      if (caseClosed) return (
        <StepCard type="Caso cerrado" color={C.textSec} title="El caso ha sido cerrado"
          footer={<button style={s.btnP} onClick={reset}>↺ Nuevo paciente</button>}>
          <div style={{ background: C.bg, borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px" }}>
              <span style={{ color: C.textSec }}>Motivo:</span><span style={{ fontWeight: 500 }}>{closeMotive || "—"}</span>
              <span style={{ color: C.textSec }}>Nota:</span><span style={{ color: C.textSec }}>{closeNote || "—"}</span>
              <span style={{ color: C.textSec }}>Estado:</span>
              <span style={{ ...s.pill as React.CSSProperties, background: C.bg, color: C.textSec, border: `1px solid ${C.border}`, display: "inline-block", padding: "1px 8px" }}>Cerrado</span>
            </div>
          </div>
          <p style={{ fontSize: 11, color: C.textMuted, margin: 0 }}>El expediente queda archivado. Puede ser reabierto desde el historial del paciente.</p>
        </StepCard>
      );

      // Choosing close action — show "Cerrar caso" form inline
      return (
        <StepCard type="Acción post-algoritmo" color={C.blue} title="¿Qué desea hacer?"
          footer={
            <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => go(4)}>← Paso anterior</button>
          }>
          <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 12px", lineHeight: 1.6 }}>
            El algoritmo GPC ha concluido. Seleccione la acción para este episodio clínico.
          </p>

          {/* Option A: Seguimiento */}
          <div
            onClick={() => setCloseAction(closeAction === "followup" ? null : "followup")}
            style={{
              border: `1px solid ${closeAction === "followup" ? C.primary : C.border}`,
              borderRadius: 8, padding: 11, marginBottom: 8, cursor: "pointer",
              background: closeAction === "followup" ? C.blueBg : C.bgCard,
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>Sugerir seguimiento</p>
                <p style={{ margin: 0, fontSize: 11, color: C.textSec }}>Programar revisión en 4 semanas</p>
              </div>
              <span style={{ fontSize: 16, color: closeAction === "followup" ? C.primary : C.textMuted }}>
                {closeAction === "followup" ? "●" : "○"}
              </span>
            </div>
            {closeAction === "followup" && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.borderLight}` }}>
                <button
                  style={{ ...s.btnP, fontSize: 12, padding: 9 }}
                  onClick={(e) => { e.stopPropagation(); setFollowupConfirmed(true); }}>
                  Confirmar — crear tarea para secretaria
                </button>
              </div>
            )}
          </div>

          {/* Option B: Cerrar caso */}
          <div
            onClick={() => setCloseAction(closeAction === "close" ? null : "close")}
            style={{
              border: `1px solid ${closeAction === "close" ? C.warn : C.border}`,
              borderRadius: 8, padding: 11, cursor: "pointer",
              background: closeAction === "close" ? C.warnBg : C.bgCard,
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>Cerrar caso</p>
                <p style={{ margin: 0, fontSize: 11, color: C.textSec }}>Remisión, alta, defunción u otro motivo</p>
              </div>
              <span style={{ fontSize: 16, color: closeAction === "close" ? C.warn : C.textMuted }}>
                {closeAction === "close" ? "●" : "○"}
              </span>
            </div>
            {closeAction === "close" && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.borderLight}` }}>
                <p style={{ ...s.lbl, margin: "0 0 5px" }}>Motivo de cierre</p>
                <select
                  value={closeMotive}
                  onChange={(e) => setCloseMotive(e.target.value)}
                  style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", fontSize: 12, marginBottom: 8, background: C.bgCard, color: C.text }}>
                  <option value="">Seleccionar...</option>
                  <option value="Remisión completa del dolor">Remisión completa del dolor</option>
                  <option value="Alta por control satisfactorio">Alta por control satisfactorio</option>
                  <option value="Referencia a especialista">Referencia a especialista</option>
                  <option value="Cambio de unidad médica">Cambio de unidad médica</option>
                  <option value="Defunción">Defunción</option>
                  <option value="Rechazo de tratamiento">Rechazo de tratamiento</option>
                </select>
                <p style={{ ...s.lbl, margin: "0 0 5px" }}>Nota de cierre (opcional)</p>
                <textarea
                  value={closeNote}
                  onChange={(e) => setCloseNote(e.target.value)}
                  placeholder="Observaciones del médico..."
                  rows={3}
                  style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", fontSize: 12, marginBottom: 8, resize: "vertical", fontFamily: "inherit", color: C.text, background: C.bgCard, boxSizing: "border-box" as const }} />
                <button
                  style={{ ...s.btnP, fontSize: 12, padding: 9, ...(closeMotive ? {} : { opacity: 0.45, cursor: "not-allowed" }) }}
                  onClick={() => closeMotive && setCaseClosed(true)}>
                  {closeMotive ? "Cerrar caso" : "Selecciona un motivo para continuar"}
                </button>
              </div>
            )}
          </div>
        </StepCard>
      );
    }

    // ---- Step 6: Visita 2 — Reanudación ----
    if (step === 6) {
      const d = DRUGS.find(x => x.id === drug);
      const adherenceOptions: { value: "buena" | "parcial" | "pobre"; label: string; color: string; bg: string }[] = [
        { value: "buena", label: "Buena", color: C.safe, bg: C.greenBg },
        { value: "parcial", label: "Parcial", color: C.caution, bg: C.amberBg },
        { value: "pobre", label: "Pobre", color: C.warn, bg: C.warnBg },
      ];

      const painColor = v2Pain <= 3 ? C.safe : v2Pain <= 6 ? C.caution : C.warn;

      return (
        <StepCard type="Seguimiento GPC — Visita 2" color={C.green} title="Reanudación de algoritmo"
          footer={
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <button style={{ ...s.btnG, width: "100%", textAlign: "center" }} onClick={() => { go(5); setFollowupConfirmed(false); }}>← Volver al cierre</button>
            </div>
          }>

          {/* Previous visit context */}
          <div style={{ background: C.bg, borderRadius: 8, padding: 10, marginBottom: 14, fontSize: 12 }}>
            <p style={{ margin: "0 0 4px", fontWeight: 500, color: C.textSec, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Visita anterior</p>
            <p style={{ margin: 0 }}>
              <span style={{ color: C.textSec }}>Medicamento: </span>
              <strong style={{ color: C.text }}>{d?.name ?? "—"}</strong>
              <span style={{ color: C.textSec }}> · {d?.dose ?? ""}</span>
            </p>
          </div>

          {/* Pain scale */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ ...s.lbl, margin: "0 0 6px" }}>Escala de dolor actual (EVA)</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: C.textSec, minWidth: 20 }}>0</span>
              <input
                type="range" min={0} max={10} value={v2Pain}
                onChange={(e) => setV2Pain(Number(e.target.value))}
                style={{ flex: 1, accentColor: painColor }} />
              <span style={{ fontSize: 11, color: C.textSec, minWidth: 20 }}>10</span>
              <div style={{ background: painColor + "22", border: `1px solid ${painColor}`, borderRadius: 6, padding: "3px 10px", minWidth: 36, textAlign: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: painColor }}>{v2Pain}</span>
              </div>
            </div>
            <p style={{ margin: "5px 0 0", fontSize: 11, color: painColor }}>
              {v2Pain <= 3 ? "Dolor leve — buen control" : v2Pain <= 6 ? "Dolor moderado — control parcial" : "Dolor severo — control insuficiente"}
            </p>
          </div>

          {/* Adherence */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ ...s.lbl, margin: "0 0 7px" }}>Adherencia al tratamiento</p>
            <div style={{ display: "flex", gap: 7 }}>
              {adherenceOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setV2Adherence(opt.value)}
                  style={{
                    flex: 1, padding: "8px 6px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                    border: `1px solid ${v2Adherence === opt.value ? opt.color : C.border}`,
                    background: v2Adherence === opt.value ? opt.bg : C.bgCard,
                    color: v2Adherence === opt.value ? opt.color : C.textSec,
                    cursor: "pointer",
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Control ≥50% decision */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ ...s.lbl, margin: "0 0 7px" }}>¿Reducción del dolor ≥ 50% respecto a visita previa?</p>
            <div style={{ display: "flex", gap: 7 }}>
              <button
                onClick={() => setV2Control("si")}
                style={{
                  flex: 1, padding: "9px 6px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${v2Control === "si" ? C.safe : C.border}`,
                  background: v2Control === "si" ? C.greenBg : C.bgCard,
                  color: v2Control === "si" ? C.safe : C.textSec,
                  cursor: "pointer",
                }}>
                ✓ Sí — control logrado
              </button>
              <button
                onClick={() => setV2Control("no")}
                style={{
                  flex: 1, padding: "9px 6px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${v2Control === "no" ? C.warn : C.border}`,
                  background: v2Control === "no" ? C.warnBg : C.bgCard,
                  color: v2Control === "no" ? C.warn : C.textSec,
                  cursor: "pointer",
                }}>
                ✗ No — sin control
              </button>
            </div>
          </div>

          {/* Result */}
          {v2Control === "si" && (
            <div style={{ background: C.greenBg, borderRadius: 8, padding: 11, fontSize: 12 }}>
              <p style={{ margin: "0 0 5px", fontWeight: 500, color: C.green }}>✓ Control alcanzado — Cerrar caso</p>
              <p style={{ margin: "0 0 9px", color: C.textSec }}>El paciente logró reducción ≥50% del dolor. Se procede al cierre exitoso del caso.</p>
              <button style={{ ...s.btnP, fontSize: 12, padding: 9 }} onClick={reset}>
                ✓ Registrar alta y nuevo paciente
              </button>
            </div>
          )}
          {v2Control === "no" && (
            <div style={{ background: C.warnBg, borderRadius: 8, padding: 11, fontSize: 12 }}>
              <p style={{ margin: "0 0 5px", fontWeight: 500, color: C.warn }}>Control insuficiente — Continuar algoritmo</p>
              <p style={{ margin: "0 0 9px", color: C.textSec }}>
                {v2Adherence === "pobre"
                  ? "Adherencia pobre: reforzar apego antes de cambiar medicamento."
                  : "Considerar ajustar dosis, cambiar fármaco o combinar con segundo agente. Evaluar referencia a nivel 2."}
              </p>
              <div style={{ display: "flex", gap: 7 }}>
                <button
                  style={{ ...s.btnG, flex: 1, textAlign: "center", fontSize: 12 }}
                  onClick={() => go(3, { drug: null })}>
                  Cambiar medicamento
                </button>
                <button
                  style={{ ...s.btnG, flex: 1, textAlign: "center", fontSize: 12, borderColor: C.warn, color: C.warn }}
                  onClick={() => go(3, { ci: "si" })}>
                  Referir nivel 2
                </button>
              </div>
            </div>
          )}
        </StepCard>
      );
    }

    return null;
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <span style={{ fontSize: 13, color: C.textSec }}>← GPC interactiva · md-design-system</span>
        <span style={{ ...s.pill, background: C.cautionBg, color: C.caution, border: `1px solid #EED882` }}>Validación médica pendiente</span>
      </div>

      {/* Body: 3 columns */}
      <div style={s.body}>
        {/* LEFT SIDEBAR — Patient + Tree */}
        <div style={s.sidebar}>
          {/* Patient Card */}
          <div>
            <p style={s.lbl}>Paciente</p>
            <div style={{ ...s.card, padding: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.greenBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 500, color: C.green, flexShrink: 0 }}>JM</div>
                <div><p style={{ margin: 0, fontSize: 12, fontWeight: 500 }}>Juan M., 67 años</p><p style={{ margin: 0, fontSize: 11, color: C.textSec }}>DM2 · 12 años</p></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, fontSize: 11 }}>
                {[
                  { label: "HbA1c", value: "9.2%", warn: true },
                  { label: "Creatinina", value: "1.1 mg/dL", warn: false },
                  { label: "Presión art.", value: "148/92", warn: true },
                  { label: "Cardiopatía", value: "No", warn: false },
                ].map(lab => (
                  <div key={lab.label} style={{ background: C.bg, borderRadius: 6, padding: "5px 7px" }}>
                    <p style={{ margin: 0, color: C.textSec }}>{lab.label}</p>
                    <p style={{ margin: 0, fontWeight: 500, color: lab.warn ? C.warn : C.safe }}>{lab.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Algorithm Tree */}
          <div>
            <p style={s.lbl}>Recorrido del algoritmo</p>
            {TREE.map((t, i) => {
              const done = step > i;
              const active = step === i;
              const color = STEP_COLORS[i];
              const dotBg = done ? color : "transparent";
              const dotBorder = done || active ? color : C.border;
              const textColor = done || active ? C.text : C.textSec;
              let detail = "";
              if (i === 2 && ci) detail = ci === "no" ? "→ Sin contraindicaciones" : "→ Con contraindicaciones";
              if (i === 3 && drug) { const d = DRUGS.find(x => x.id === drug); detail = d ? `→ ${d.name}` : ""; }
              if (i === 5 && followupConfirmed) detail = "→ Seguimiento programado";
              if (i === 5 && caseClosed) detail = "→ Caso cerrado";
              if (i === 6 && v2Control === "si") detail = "→ Alta exitosa";
              if (i === 6 && v2Control === "no") detail = "→ Continuar algoritmo";
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "2px 0" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotBg, border: `2px solid ${dotBorder}`, flexShrink: 0 }} />
                    {i < TREE.length - 1 && <div style={{ width: 1, height: 14, background: C.borderLight, margin: "2px 0" }} />}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: textColor, fontWeight: active ? 500 : 400 }}>{t.label}</p>
                    {detail && <p style={{ margin: 0, fontSize: 11, color }}>{detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={s.main}>
          {/* Header */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
              <span style={{ ...s.pill, background: C.bg, color: C.textSec }}>SSA-010-08</span>
              <span style={{ ...s.pill, background: C.bg, color: C.textSec }}>CIE-10: E10–E14.4</span>
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 3px", lineHeight: 1.35 }}>
              Diagnóstico y tratamiento del dolor por neuropatía periférica diabética en adultos
            </h2>
            <p style={{ fontSize: 11, color: C.textSec, margin: 0 }}>Secretaría de Salud / CENETEC · Primer nivel · 2009</p>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textSec, marginBottom: 4 }}>
              <span>Paso {step + 1} de {TREE.length}</span><span>{pct}% completado</span>
            </div>
            <div style={{ height: 2, background: C.bg, borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: STEP_COLORS[Math.min(step, STEP_COLORS.length - 1)], borderRadius: 99, transition: "width 0.3s" }} />
            </div>
          </div>

          {/* Step content */}
          {renderStep()}
        </div>

        {/* RIGHT PANEL — Clinical Note */}
        <div style={s.notePanel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <p style={s.lbl}>Nota médica</p>
            <button style={{ ...s.btnG, fontSize: 11, padding: "3px 8px", borderRadius: 6 }} onClick={copyNote}>
              {copied ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
          <div style={{
            flex: 1, background: C.bg, borderRadius: 8, padding: 9, fontSize: 11,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace", lineHeight: 1.6,
            color: C.textSec, whiteSpace: "pre-wrap", minHeight: 100, overflowY: "auto",
            border: `1px solid ${C.border}`,
          }}>
            {note}
          </div>
          <div style={{ padding: "8px 0 0", fontSize: 10, color: C.textMuted }}>
            <p style={{ margin: 0 }}>Auto-generada · Se actualiza con cada paso</p>
            <p style={{ margin: "2px 0 0", color: C.caution }}>Solo para demostración clínica</p>
          </div>
        </div>
      </div>
    </div>
  );
}
