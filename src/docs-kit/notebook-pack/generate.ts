/**
 * NotebookLM Pack Generator
 *
 * Generates optimized markdown documents ready to upload to Google NotebookLM.
 * Each document is structured to maximize the quality of Audio Overviews.
 */

import type { NotebookPackConfig, NotebookDoc } from "../types";

/** Format a single document for NotebookLM consumption */
function formatDoc(doc: NotebookDoc): string {
  return `---
title: ${doc.title}
type: ${doc.type}
---

${doc.content.trim()}
`;
}

/** Generate the full notebook pack as a single concatenated markdown file */
export function generateNotebookPack(config: NotebookPackConfig): string {
  const header = `# ${config.projectName} — NotebookLM Pack

> Generated for upload to Google NotebookLM.
> Upload this file (or split by section markers) to create an Audio Overview.

**Project:** ${config.projectName}
**Description:** ${config.description}
${config.metadata?.version ? `**Version:** ${config.metadata.version}` : ""}
${config.metadata?.audience ? `**Audience:** ${config.metadata.audience}` : ""}
${config.metadata?.generatedAt ? `**Generated:** ${config.metadata.generatedAt}` : ""}

---

`;

  const sections = config.docs
    .map((doc, i) => {
      const separator = i > 0 ? "\n\n---\n\n" : "";
      return `${separator}${formatDoc(doc)}`;
    })
    .join("");

  return header + sections;
}

/** Generate individual markdown files (one per doc) */
export function generateNotebookDocs(
  config: NotebookPackConfig
): Array<{ filename: string; content: string }> {
  return config.docs.map((doc) => ({
    filename: `${config.projectSlug}-${doc.type}.md`,
    content: formatDoc(doc),
  }));
}

/** Generate a summary document optimized for Audio Overview narration */
export function generateAudioSummary(config: NotebookPackConfig): string {
  return `# ${config.projectName} — Resumen para Audio Overview

Este documento esta optimizado para que NotebookLM genere un podcast/audio overview claro y estructurado.

## Que es ${config.projectName}?

${config.description}

## Documentos incluidos

${config.docs.map((doc) => `- **${doc.title}** (${doc.type})`).join("\n")}

## Instrucciones para NotebookLM

Al generar el Audio Overview, enfocarse en:
1. Explicar que problema resuelve ${config.projectName}
2. Describir las features principales
3. Mencionar el stack tecnologico
4. Resumir los resultados o metricas clave

${config.metadata?.audience ? `**Audiencia objetivo:** ${config.metadata.audience}` : ""}
`;
}
